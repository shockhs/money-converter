import React, { FunctionComponent } from 'react'
import countries from '../baseCountries'
import { Country } from './index'

interface PersonProps {
    rates: Country
    control: string
}

const Select: FunctionComponent<PersonProps> = ({ rates, control }: PersonProps) => {
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
