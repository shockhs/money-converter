import axios from 'axios'

class Agent {
    fetchData = async (url) => {
        try {
            return await axios.get(url)
        } catch (e) {
            throw new Error(e)
        }
    }

    getExchangeRate() {
        return this.fetchData('https://api.exchangeratesapi.io/latest').then((res) => {
            if (res.status === 200) {
                return res.data.rates
            }
        })
    }
}

const AgentService = new Agent()

export { AgentService }
