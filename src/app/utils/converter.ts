interface typeProps {
    controlInput: string
    controlFrom: number
    controlTo: number
}

export default ({ controlInput, controlFrom, controlTo }: typeProps): string | number => {
    if (!/\d+(\.\d+)?$/.test(controlInput)) return 'Неизвестно'
    return ((parseFloat(controlInput) / controlFrom) * controlTo).toFixed(3)
}
