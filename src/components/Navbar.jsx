import React, { useEffect, useState } from 'react'
import TranslateIcon from '@mui/icons-material/Translate';
import i18next from 'i18next';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';

export default function Navbar() {
  const [theme, setTheme] = useState('dark')
  const [firstTheme, setFirstTheme] = useState(null)
  const [lang, setLang] = useState(null)

  useEffect(() => {
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setTheme('dark')
      setFirstTheme('dark')
    } else {
      setTheme('light')
      setFirstTheme('light')
    }

    if (localStorage.lang === 'en' || (!('lang' in localStorage) && navigator.language === 'en-US')) {
      setLang('en')
    } else {
      setLang('ru')
    }

  }, [])

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  useEffect(() => {
    document.documentElement.setAttribute('lang', lang)
    localStorage.setItem('lang', lang)
    i18next.changeLanguage(lang)
  }, [lang])

  const changeTheme = (theme) => {
    if (theme === 'dark') {
      setTheme('dark')
    }
    else {
      setTheme('light')
    }
  }

  const changeLanguage = (lang) => {
    if (lang === 'en') {
      setLang('ru')
    }
    else {
      setLang('en')
    }
  }

  return (
    <div className='text-3xl flex items-center justify-between py-2 p-5'>
        <p onClick={() => window.location.reload()} className="cursor-pointer">
          Kanban Board
        </p>
        <div className='flex flex-row gap-2'>
          <div className="dropdown dropdown-end" title="Change Language">
            <label tabIndex={0} className="btn m-1"><TranslateIcon/></label>
            <ul tabIndex={0} className="dropdown-content menu shadow bg-base-100 rounded-box text-sm w-52 p-2">
                <li onClick={() => {changeLanguage('en'); setLang('en')}} className='flex '>
                  <button className={lang === 'en' ? 'active' : ''}>
                    <img src='https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.0/svg/1f1ec-1f1e7.svg' loading='lazy' className='w-5'></img>
                    <a>English</a>
                  </button>
                </li>
                <li onClick={() => {changeLanguage('ru'); setLang('ru')}} className='flex'>
                  <button className={lang === 'en' ? '' : 'active'}>
                    <img src='https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.0/svg/1f1f7-1f1fa.svg' loading='lazy' className='w-5'></img>
                    <a>Русский</a>
                  </button>
                </li>
            </ul>
          </div>
          <div className="dropdown dropdown-end" title="Change Theme">
            <label tabIndex={0} className="btn m-1">Theme</label>
            <ul tabIndex={0} className="dropdown-content menu shadow bg-base-100 rounded-box text-sm w-52 p-2">
            <li onClick={() => changeTheme('dark')}>
              <button className={theme == 'dark' ? 'active' : ''}>
                <DarkModeIcon/>
                <a>Dark</a>
              </button>
            </li>
            <li onClick={() => changeTheme('light')}>
              <button className={theme == 'dark' ? '' : 'active'}>
                <LightModeIcon/>
                <a>Light</a>
              </button>
            </li>
            </ul>
          </div>
      </div>
    </div>
  )
}
