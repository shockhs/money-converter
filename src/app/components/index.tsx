import React, { FC, useEffect, useMemo, useRef, useState } from 'react'
import { AgentService } from '../services/agent'
import getExchangeResult from '../utils/converter'
import FromField from './FromField'
import Select from './Select'
import Spinner from './commons/Spinner'
import ToField from './ToField'
import '../styles/styles.scss'

export type Country = {
    [key: string]: number
}

const Converter: FC = () => {
    const mounted = useRef(false)
    const [rates, setRates] = useState<Country>({ EUR: 1 })
    const [controlInput, setControlInput] = useState('')
    const [controlFrom, setControlFrom] = useState('')
    const [controlTo, setControlTo] = useState('')

    useEffect(() => {
        AgentService.getExchangeRate().then((data: Country) => {
            mounted.current = true
            setRates((rates) => JSON.parse(JSON.stringify(Object.assign(rates, data))))
        })
        return () => {
            mounted.current = false
        }
    }, [])

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
                    >
                        <Select rates={rates} control={controlTo} />
                    </FromField>
                    <ToField controlFrom={controlFrom} setControlTo={setControlTo} controlTo={controlTo} converter={converter}>
                        <Select rates={rates} control={controlFrom} />
                    </ToField>
                </form>
            ) : (
                <Spinner />
            )}
        </div>
    )
}

export default Converter
