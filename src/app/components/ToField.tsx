import React, { FC } from 'react'

type typeProps = {
    setControlTo: (arg: string) => void
    optionsTo: React.ReactNode
    controlTo: string
    controlFrom: string
    converter: React.ReactText
}

const ToField: FC<typeProps> = ({ controlTo, setControlTo, optionsTo, controlFrom, converter }: typeProps) => {
    return (
        <fieldset className="fieldset-2">
            <legend>To</legend>
            <div>
                <select
                    name="convertTo"
                    id="convertTo"
                    value={controlTo ? controlTo : 'none'}
                    onChange={(e) => setControlTo(e.target.value)}
                >
                    <option value="none" disabled>
                        none
                    </option>
                    {optionsTo}
                </select>
                <h2>{controlTo && controlFrom ? converter : null}</h2>
            </div>
        </fieldset>
    )
}

export default ToField
