import axios from 'axios'

class Agent {
    fetchData = async () => {
        try {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            return await axios.get('https://api.exchangeratesapi.io/latest')
        } catch (e) {
            throw new Error(e)
        }
    }

    getExchangeRate() {
        return this.fetchData()
    }
}

const AgentService = new Agent()

export { AgentService }
