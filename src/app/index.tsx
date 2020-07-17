import axios from 'axios';
import React, { FC, useEffect, useMemo, useRef, useState } from 'react';
import { render } from 'react-dom';
import '../styles/styles.scss';
import { obj } from './baseCountries';

interface Country {
    [key: string]: string
}


const Converter: FC = () => {
    const mounted = useRef(false)
    const [rates, setRates] = useState<Country>({})
    const [controlInput, setControlInput] = useState('')
    const [controlFrom, setControlFrom] = useState('')
    const [controlTo, setControlTo] = useState('')

    useEffect(() => {
        mounted.current = true
        const fetchData = async () => {
            await axios.get('https://api.exchangeratesapi.io/latest')
                .then((res: any) => {
                    if (res.status === 200) {
                        setRates(res.data.rates)
                    }
                })
        }
        fetchData()
    }, [])

    const optionsTo = useMemo(() => Object.keys(rates).map((key: string, index: number) => {
        return <option key={index} value={key} disabled={key === controlFrom}>{key} - {obj[key]}</option>
    }), [rates, controlFrom]);

    const optionsFrom = useMemo(() => Object.keys(rates).map((key: string, index: number) => {
        return <option key={index} value={key} disabled={key === controlTo}>{key} - {obj[key]}</option>
    }), [rates, controlTo]);

    const converter = useMemo(() => {
        if (!/\d+(\.\d+)?$/.test(controlInput)) return 'Неизвестно'
        return (parseFloat(controlInput) / parseFloat(rates[controlFrom]) * parseFloat(rates[controlTo])).toFixed(3)
    }, [controlFrom, controlTo, controlInput])

    return <div className='container'>
        <h1>Currency converter</h1>
        {mounted.current
            ? <form>
                <fieldset className="fieldset-1">
                    <legend>From</legend>
                    <div>
                        <select name='convertFrom' id='convertFrom' value={controlFrom ? controlFrom : 'none'} onChange={e => setControlFrom(e.target.value)}>
                            <option value='none' disabled>none</option>
                            {optionsFrom}
                        </select>
                        <input type='text' value={controlInput} onChange={(e) => setControlInput(e.target.value)} />
                        <h2>{controlInput ? /\d+(\.\d+)?$/.test(controlInput) ? 'From: ' + controlInput : 'Неверный формат данных' : 'Введите сумму'}</h2>
                    </div>
                </fieldset>
                <fieldset className="fieldset-2">
                    <legend>To</legend>
                    <div>
                        <select name='convertTo' id='convertTo' value={controlTo ? controlTo : 'none'} onChange={e => setControlTo(e.target.value)}>
                            <option value='none' disabled>none</option>
                            {optionsTo}
                        </select>
                        <h2>{controlTo && controlFrom ? converter : null}</h2>
                    </div>
                </fieldset>
            </form>
            : 'Loading...'
        }
    </div>
}


render(<Converter />, document.getElementById('app') as HTMLElement)


