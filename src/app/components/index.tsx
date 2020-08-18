import { AgentService } from '../services/agent'
import React, { FC, useEffect, useMemo, useRef, useState } from 'react'
import '../styles/styles.scss'
import Select from './Select'
import getExchangeResult from '../utils/converter'
import FromField from './FromField'
import ToField from './ToField'

export interface Country {
    [key: string]: number
}

const fetchData = async () => {
    try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const data = AgentService.getExchangeRate().then((res: any) => {
            if (res.status === 200) {
                return res
            }
        })
        return data
    } catch (e) {
        throw new Error(e)
    }
}

const Converter: FC = () => {
    const mounted = useRef(false)
    const [rates, setRates] = useState<Country>({ EUR: 1 })
    const [controlInput, setControlInput] = useState('')
    const [controlFrom, setControlFrom] = useState('')
    const [controlTo, setControlTo] = useState('')

    useEffect(() => {
        mounted.current = true
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        fetchData().then((res: any) => setRates((rates) => JSON.parse(JSON.stringify(Object.assign(rates, res.data.rates)))))
        return () => {
            mounted.current = false
        }
    }, [])

    const optionsTo = useMemo(() => <Select rates={rates} control={controlFrom} />, [rates, controlFrom])

    const optionsFrom = useMemo(() => <Select rates={rates} control={controlTo} />, [rates, controlTo])

    const converter = useMemo(() => {
        return getExchangeResult({ controlInput, controlFrom: rates[controlFrom], controlTo: rates[controlTo] })
    }, [controlFrom, controlTo, controlInput])

    return (
        <div className="container">
            <h1>Currency converter</h1>
            {mounted.current ? (
                <form>
                    <FromField
                        controlFrom={controlFrom}
                        controlInput={controlInput}
                        setControlInput={setControlInput}
                        setControlFrom={setControlFrom}
                        optionsFrom={optionsFrom}
                    />
                    <ToField
                        controlFrom={controlFrom}
                        setControlTo={setControlTo}
                        optionsTo={optionsTo}
                        controlTo={controlTo}
                        converter={converter}
                    />
                </form>
            ) : (
                'Loading...'
            )}
        </div>
    )
}

export default Converter
