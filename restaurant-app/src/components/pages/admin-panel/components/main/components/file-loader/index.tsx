import React, { Dispatch, useState } from 'react';
import './style.sass';

import classNames from 'classnames';
import Dropzone from 'react-dropzone';
import { Methods } from '../../../../../../../methods';

type props = {api: string | undefined; error: boolean; skipError?: () => void; img?: string; setImg: Dispatch<React.SetStateAction<string | undefined>>; imgPath?: string; uploadMethod?: (api: string, file: File, setImgUploadError: React.Dispatch<React.SetStateAction<string | undefined>>) => Promise<string | null>};

export const FileLoader = ({api, error, skipError, img, imgPath='/img/menu/', setImg, uploadMethod}: props) => {
  const [imgUploadError, setImgUploadError] = useState<string>();
  const [dragOver, setDragOver] = useState(false);
  const [loading, setLoading] = useState(false);

  const uploadImg = uploadMethod ?? Methods.uploadImg;

  const onDrop = async (files: File[]) => {
    if (!api) return;
    skipError && skipError();
    const file = files[0];
    setDragOver(false);
    setImgUploadError(undefined);
    if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
      setImgUploadError('Недопустимый формат файла. Допустимы jpeg и png');
      console.warn('Недопустимый формат файла. Допустимы изображения форматов jpeg и png');
      return;
    }
    setLoading(true);
    const newImg = await uploadImg(api, file, setImgUploadError).then();
    setLoading(false);
    if (newImg) {
      setImg(newImg);
    } 
  };
  return (
    <Dropzone onDrop={onDrop} onDragOver={() => {skipError && skipError(), setDragOver(true); setImgUploadError(undefined);}} onDragLeave={() => setDragOver(false)}>
      {({getRootProps, getInputProps}) => (
        <section className='file-loader'>
          <div className={classNames('dropzone', 'file-loader__dropzone', error && 'file-loader__dropzone_error', dragOver && 'file-loader__dropzone_active')}  {...getRootProps()}>
            <input {...getInputProps()} />
            <div className='file-loader__container'>
              {loading && <div className='file-loader__loading'><img className='file-loader__loading-img' src='/img/loading.gif' /></div>}
              {img ? <div className='file-loader__img-container'>
                <img className='file-loader__img' src={`${api}${imgPath}${img}`} alt='photo'/>
              </div> : ''}
              <p>{imgUploadError ? <span className='file-loader__error'>{imgUploadError}</span> : (img ? 'Чтобы заменить изобажение, кликните или перетащите файл' : 'Чтобы добавить изображение, кликните или перетащите файл')}</p>
            </div>
          </div>
        </section>
      )}
    </Dropzone>
  );
};