import React, { FunctionComponent } from 'react'
import countries from '../baseCountries'
import { Country } from './index'

type typeProps = {
    rates: Country
    control: string
}

const Select: FunctionComponent<typeProps> = ({ rates, control }: typeProps) => {
    return (
        <>
            {Object.keys(rates).map((key: string, index: number) => {
                return (
                    <option key={index} value={key} disabled={key === control}>
                        {key} - {countries[key]}
                    </option>
                )
            })}
        </>
    )
}

export default Select
