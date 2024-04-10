import { ChangeEvent, useEffect, useState } from 'react'
import ThemeSwitch from '../../ui/themeSwitch'
import { Select, SelectItem, Tab, Tabs } from '@nextui-org/react'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router-dom'
import { LogOut } from 'lucide-react'
import logo from '../../assets/Otp_bank_Logo.svg'
const Header = () => {
    const defaultTheme = (localStorage.getItem('theme') || `${window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
        }`) === 'true' ? true : false
    const [theme, setTheme] = useState(defaultTheme)
    const [lang, setLang] = useState('')

    const { t, i18n } = useTranslation()
    const location = useLocation()
    const navigate = useNavigate()

    const changeTheme = (val: boolean) => {
        localStorage.setItem("theme", `${val}`);
        setTheme(val);
        val
            ? document.body.classList.add('dark')
            : document.body.classList.remove('dark')
    };

    const changeLang = (e: ChangeEvent<HTMLSelectElement>) => {
        i18n.changeLanguage(`${e.target.value}`)
        setLang(e.target.value)
        localStorage.setItem('lang', `${e.target.value}`)
    }

    const logOut = () => {
        localStorage.removeItem('token')
        navigate('/auth')
    }

    useEffect(() => {
        changeTheme(defaultTheme)
    }, [defaultTheme])

    useEffect(() => {
        setLang(localStorage.getItem('lang') === 'uz' ? 'uz' : 'ru')
        i18n.changeLanguage(lang)
    }, [lang, i18n])

    return (
        <header className='px-3 sm:px-5 py-2 sm:py-3  flex items-center gap-3 justify-between z-20'>
            <img src={logo} className='hidden sm:flex w-16 lg:w-20' />
            {location.pathname !== '/auth' &&
                <Tabs
                    aria-label='nav links'
                    variant='underlined'
                    color='success' size='lg'
                    selectedKey={location.pathname}
                    onSelectionChange={(e) => navigate(`${e}`)}
                    className='hidden sm:flex'
                >
                    {links.map((l: Linkk) => (
                        <Tab key={l.href} value={l.href} title={t(l.name)} />
                    ))}
                </Tabs>}
            {location.pathname !== 'auth' &&
                <Select
                    size='sm'
                    aria-label='links'
                    className='sm:hidden w-full max-w-[180px]'
                    selectedKeys={[links.find(f => f.href === location.pathname)?.href || links[0].href]}
                >
                    {links.map((l: Linkk) => (
                        <SelectItem
                            key={l.href}
                            className={`text-foreground ${location.pathname === l.href && '!text-success'}`}
                            onClick={() => navigate(l.href)}>
                            {t(l.name)}
                        </SelectItem>
                    ))}
                </Select>}
            <div className='flex items-center gap-3 sm:gap-5'>
                <Select
                    size='sm'
                    aria-label='language'
                    className='w-[70px]'
                    selectedKeys={[lang || 'uz']}
                    onChange={changeLang}
                >
                    <SelectItem key='uz' className={`text-foreground ${lang === 'uz' && '!text-success'}`} >
                        Uz
                    </SelectItem>
                    <SelectItem key='ru' className={`text-foreground ${lang === 'ru' && '!text-success'}`}>
                        Ру
                    </SelectItem>
                </Select>
                <ThemeSwitch value={theme} onChange={changeTheme} />
                {localStorage.getItem('token') && <LogOut className="text-success w-5 sm:w-6 font-bold !aspect-square p-1 px-2 sm:p-2 bg-content2 cursor-pointer rounded-full box-content" onClick={logOut} />}
            </div>
        </header>
    )
}

export default Header

interface Linkk {
    name: string,
    href: string
}
const links: Linkk[] = [
    { name: "Database", href: '/' },
    { name: "Monitoring", href: '/monitoring' },
    { name: "Admins", href: '/admins' },
    { name: "History", href: '/history' }
]