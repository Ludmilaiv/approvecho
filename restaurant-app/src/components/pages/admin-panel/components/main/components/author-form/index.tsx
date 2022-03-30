import React, {useState, useEffect} from 'react';
import './style.sass';
import { Methods } from '../../../../../../../methods';

type props = {setAuth: React.Dispatch<React.SetStateAction<boolean>>}

export function AuthorForm({setAuth}: props) {
  const [api, setApi] = useState<string>();
  const [pass, setPass] = useState<string>('');
  const [error, setError] = useState<string>();

  const getApi = async() => {
    const api = await Methods.getApi().then();
    setApi(api);
  };

  useEffect(() => {
    getApi();
  }, []);

  const author = async () => {
    if (!api) return;
    const sessionId = await Methods.author(api, pass, setError).then();
    if (sessionId) {
      localStorage.setItem('token', sessionId);
      setAuth(true);
    }
  };

  return (
    <form className='author-form' action='#' onSubmit={e => e.preventDefault()}>
      <fieldset className='author-form__body'>
        <legend className='author-form__title'>Вход в панель администратора</legend>
        <input value={pass} className='author-form__input' type="text" placeholder='Пароль администратора' onInput={e => {
          setPass((e.target as HTMLInputElement).value);
          if (error) setError(undefined);
        }} />
        {!!error && (<span className='author-form__span author-form__span_err'>{error}</span>)}
        <button type='submit' className='author-form__button ui-button ui-button-light' onClick={author}>
          Войти
        </button>
        <span className='author-form__span'>Если забыли пароль, обратитесь к веб-мастеру</span>
      </fieldset>
    </form>
  );
}