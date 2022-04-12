import './style.sass';
import React, {useState, useEffect} from 'react';
import classNames from 'classnames';
import { Methods } from '../../../../../../../methods';
import { Table } from '../../../../../../../types';
import { Loader } from '../../../../../../loader';
import { Modal } from '../../../../../../modal';
import { AddTable } from './components/add-table';
import { RemoveTable } from './components/remove-table';
import { ChangeTable } from './components/change-table';
import { FileLoader } from '../file-loader';

export function Tables() {
  const [tables, setTables] = useState<Table[]>();
  const [api, setApi] = useState<string>();
  const [tablesLoading, setTablesLoading] = useState(true);
  const [imgLoading, setImgLoading] = useState(true);
  const [removedTable, setRemovedTable] = useState<number>();
  const [img, setImg] = useState<string>();

  const getApi = async() => {
    const api = await Methods.getApi().then();
    setApi(api);
  };

  const getTables = async() => {
    if (!api) return;
    const tables = await Methods.getTables(api).then();
    setTables(tables);
    setTablesLoading(false);
  };

  const getTablesMap = async() => {
    if (!api) return;
    const image = await Methods.getTablesMap(api).then();
    if (image) {
      setImg(image);
    } else {
      setImg(undefined);
    }
    setImgLoading(false);
  };

  const moveTableUp = async (id: number) => {
    if (!tables || !api) return;
    const cat = tables.find(elem => elem.id === id);
    if (!cat) return;
    const index = tables.indexOf(cat);
    if (index === 0) return;
    const order = cat.order_index;
    cat.order_index = tables[index - 1].order_index;
    tables[index - 1].order_index = order;
    await Methods.moveTable(api, cat.id, tables[index - 1].id);
    setTables([...tables.sort((prev, next) => prev.order_index - next.order_index)]);
  };

  const moveTableDown = async (id: number) => {
    if (!tables || !api) return;
    const cat = tables.find(elem => elem.id === id);
    if (!cat) return;
    const index = tables.indexOf(cat);
    if (index === tables.length) return;
    const order = cat.order_index;
    cat.order_index = tables[index + 1].order_index;
    tables[index + 1].order_index = order;
    await Methods.moveTable(api, cat.id, tables[index + 1].id);
    setTables([...tables.sort((prev, next) => prev.order_index - next.order_index)]);
  };

  useEffect(() => {
    getApi();
  }, []);

  useEffect(() => {
    getTables();
    getTablesMap();
  }, [api]);

  return (
    <section className='admit-tables container' id="booking">
      <h2 className='admin-main__subtitle'>Редактирование столов</h2>
      <div className='admin-tables__wrp'>
        <div className='admin-tables__list-wrp'>
          <h2 className='admin-tables__title'>Столы <Modal trigger={<button className='admin-tables__add-btn'>+</button>} content={<AddTable api={api} tables={tables} setTables={setTables} />}/></h2>
          <ul className='admin-tables__list'>

            {!tablesLoading ? tables?.map((table, index) =>
              <li key={table.id} className={classNames('admin-tables__item', removedTable && +removedTable === +table.id && 'display-none')}>
                <div className={classNames('admin-tables__item-move-btns', index == 0 && 'admin-tables__item-move-btns_first', index == tables.length - 1 && 'admin-tables__item-move-btns_last')}>
                  {index !== 0 && <button className='admin-tables__item-btn' onClick={() => moveTableUp(table.id)}>&#9650;</button>}
                  {index !== tables.length - 1 && <button className='admin-tables__item-btn' onClick={() => moveTableDown(table.id)}>&#9660;</button>}
                </div>
                <div>
                  {table.title}<div className='admin-tables__places'>{`${table.places}-местный`}</div>
                </div>
                <div className='admin-tables__item-btns'>
                  <Modal trigger={<button className='admin-tables__item-btn'>&#10006;</button>} content={<RemoveTable api={api} table={table} tables={tables} setTables={setTables} setRemoved={setRemovedTable}/>}/>
                  <Modal trigger={<button className='admin-tables__item-btn'>&#9998;</button>} content={<ChangeTable api={api} table={table} tables={tables} setTables={setTables}/>}/>    
                </div>
              </li>
            ): <Loader />}
          </ul>

        </div>

        <div className='admin-tables__map-wrp'>
          <h3 className='admin-tables__map-title'>Pасположения столов</h3>
          {!imgLoading ? <FileLoader api={api} img={img} error={false} setImg={setImg} imgPath='img/table-maps/' uploadMethod={Methods.uploadTablesMap} /> : <Loader />}
        </div>

      </div>
    </section>
  );
}