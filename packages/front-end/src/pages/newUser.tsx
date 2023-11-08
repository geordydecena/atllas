import React from 'react';
import clsx from 'clsx';
import Head from 'next/head';
import { Inter } from '@next/font/google';
import Header from '../components/header';
import AddOrUpdateUserList from '../components/addOrUpdateUser';
const inter = Inter({ subsets: ['latin'] });

const NewUser = () => {
    return (
        <>
            <Head>
                <title>Atllas Takehome</title>
                <meta name='viewport' content='width=device-width, initial-scale=1' />
                <link rel='icon' href='/public/favicon.ico' />
            </Head>
            <main className={clsx('w-full h-full', inter.className)}>
                <div className='p-4 h-[100vh] overflow-hidden'>
                    <Header />
                    <AddOrUpdateUserList />
                </div>
            </main>
        </>
    );
}

export default NewUser;