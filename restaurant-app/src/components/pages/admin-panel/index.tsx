import React, { useState, useEffect } from 'react';
import { Header } from './components/header';
import { Main } from './components/main';
import { Footer } from '../../footer';
import { Methods } from '../../../methods';

export function AdminPanel() {
  const [auth, setAuth] = useState<boolean>(false);
  const [api, setApi] = useState<string>();
  const [activeTab, setActiveTab] = useState<string>('menu');

  const getApi = async() => {
    const api = await Methods.getApi().then();
    setApi(api);
  };

  const authent = async () => {
    if (!api) return;
    const token = localStorage.getItem('token');
    if (!token) {
      setAuth(false);
      return;
    }
    const auth = await Methods.authent(api, token).then();
    setAuth(auth);
  };

  const logOut = () => {
    const token = localStorage.getItem('token');
    if (!api || !token) return;
    Methods.logout(api, token);
    localStorage.removeItem('token');
    authent();
  };

  useEffect(() => {
    getApi();
  }, []);

  useEffect(() => {
    authent();
  }, [api]);

  return (
    <div className="App">
      <Header setActiveTab={setActiveTab} activeTab={activeTab} logOut={logOut} withMenu={auth}/>
      <Main activeTab={activeTab} blocked={!auth} setAuth={setAuth}/>
      <Footer />
    </div>
  );
}