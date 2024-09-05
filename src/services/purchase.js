//

async function submitPurchase({ ...body }) {
    try {
        const response = await fetch('/api/subscriptions/new',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...body })
            })
        const data = await response.json();
        return data
    } catch (error) {
        console.log(error)
    }
}

async function submitThreeDSecurePurchase(res) {
    const response = await fetch('/api/subscriptions/3ds',
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: res
        })
    const data = await response.json();
    return data
}

async function fetchPlans() {
    try {
        const res = await fetch(`/api/plans`)
        const data = await res.json()
        console.log(data)
    } catch (error) {
        console.log(error)
    }
}

export { submitPurchase, submitThreeDSecurePurchase, fetchPlans }

