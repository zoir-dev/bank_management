import { ReactNode, useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import Header from "../components/header"
import left from '../assets/docs-left.png'
import right from '../assets/docs-right.png'

const Layout = ({ children }: { children: ReactNode }) => {
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate('/auth')
        } else if (localStorage.getItem('token') && location.pathname === '/auth') {
            navigate('/')
        }
    }, [location.pathname, navigate])

    return (
        <div className="min-h-screen overflow-hidden flex flex-col relative w-full bg-[#edefff] dark:bg-background">
            <div className="absolute left-[max(-7rem,calc(50%-52rem))] top-20  -translate-y-1/2 transform-gpu blur-2xl">
                <div className="aspect-[577/310] w-[36.0625rem] bg-gradient-to-r from-[#ff80b5] to-[#9089fc] dark:from-[#F54180] dark:to-[#338EF7] opacity-35 dark:opacity-20"
                    style={{ clipPath: 'polygon(74.8% 41.9%, 97.2% 73.2%, 100% 34.9%, 92.5% 0.4%, 87.5% 0%, 75% 28.6%, 58.5% 54.6%, 50.1% 56.8%, 46.9% 44%, 48.3% 17.4%, 24.7% 53.9%, 0% 27.9%, 11.9% 74.2%, 24.9% 54.1%, 68.6% 100%, 74.8% 41.9%)' }}>
                </div>
            </div>
            <div className="fixed opacity-70  dark:opacity-70 -top-[80%] -right-[60%] 2xl:-top-[60%] 2xl:-right-[45%] z-0 rotate-12">
                <img className="relative z-10  shadow-black/5 data-[loaded=true]:opacity-100 shadow-none transition-transform-opacity motion-reduce:transition-none !duration-300 rounded-large" src={right} alt="" />
            </div>
            <div className="fixed  opacity-70 dark:opacity-70 -bottom-[40%] -left-[20%] z-0">
                <img className="relative z-10  shadow-black/5 data-[loaded=true]:opacity-100 shadow-none transition-transform-opacity motion-reduce:transition-none !duration-300 rounded-large" src={left} alt="" />
            </div>

            <Header />
            <div className="min-h-full dark:bg-background sm:px-5 pt-10">
                {children}
            </div>

        </div>
    )
}

export default Layout