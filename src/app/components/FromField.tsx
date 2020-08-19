import React, { FC } from 'react'

type typeProps = {
    setControlFrom: (arg: string) => void
    setControlInput: (arg: string) => void
    children: React.ReactNode
    controlFrom: string
    controlInput: string
}

const FromField: FC<typeProps> = ({ controlFrom, setControlFrom, controlInput, setControlInput, children }: typeProps) => {
    return (
        <fieldset className="fieldset-1">
            <legend>From</legend>
            <div>
                <select
                    name="convertFrom"
                    id="convertFrom"
                    value={controlFrom ? controlFrom : 'none'}
                    onChange={(e) => setControlFrom(e.target.value)}
                >
                    <option value="none" disabled>
                        none
                    </option>
                    {children}
                </select>
                <input type="text" value={controlInput} onChange={(e) => setControlInput(e.target.value)} />
                <h2>
                    {controlInput
                        ? /\d+(\.\d+)?$/.test(controlInput)
                            ? controlInput
                            : 'Неверный формат данных'
                        : 'Введите сумму'}
                </h2>
            </div>
        </fieldset>
    )
}

export default FromField
