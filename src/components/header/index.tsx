import { ChangeEvent, useEffect, useState } from 'react'
import ThemeSwitch from '../../ui/themeSwitch'
import { Select, SelectItem } from '@nextui-org/react'
import { useTranslation } from 'react-i18next'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { LogOut } from 'lucide-react'
const Header = () => {
    const defaultTheme = JSON.parse(localStorage.getItem('theme') || `${window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
        }`)
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
        localStorage.setItem('lang', JSON.stringify(e.target.value))
    }

    useEffect(() => {
        changeTheme(defaultTheme)
    }, [defaultTheme])

    useEffect(() => {
        setLang(JSON.parse(localStorage.getItem('lang') || 'uz'))
        i18n.changeLanguage(lang)
    }, [lang, i18n])

    return (
        <header className='px-3 sm:px-5 py-2 sm:py-3  flex items-center gap-3 justify-between z-20'>
            <h3 className='text-xl font-semibold hidden sm:flex'>Logo</h3>
            <div className='gap-3 sm:gap-5 hidden sm:flex'>
                {location.pathname !== '/auth' && links.map((l: Linkk) => (
                    <NavLink to={l.href} key={l.href} className={({ isActive }) => `hover:opacity-75 active:opacity-50 duration-300 transition-opacity ${isActive && 'text-success'}`}>
                        {t(l.name)}
                    </NavLink>
                ))}
            </div>
            <Select size='sm' className='sm:hidden w-full max-w-[180px]' selectedKeys={[location.pathname]} >
                {links.map((l: Linkk) => (
                    <SelectItem key={l.href} className={`text-foreground ${location.pathname === l.href && '!text-success'}`} onClick={() => navigate(l.href)}>
                        {t(l.name)}
                    </SelectItem>
                ))}
            </Select>
            <div className='flex items-center gap-3 sm:gap-5'>
                <Select size='sm' className='w-[70px]' selectedKeys={[lang]} onChange={changeLang} >
                    <SelectItem key='uz' className={`text-foreground ${lang === 'uz' && '!text-success'}`} >
                        Uz
                    </SelectItem>
                    <SelectItem key='ru' className={`text-foreground ${lang === 'ru' && '!text-success'}`}>
                        Ру
                    </SelectItem>
                </Select>
                <ThemeSwitch value={theme} onChange={changeTheme} />
                < LogOut className="text-success w-5 sm:w-6 font-bold !aspect-square p-1 px-2 sm:p-2 bg-content1 cursor-pointer rounded-full box-content" />
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
    { name: "Monitoring", href: '/monitoring' }
]