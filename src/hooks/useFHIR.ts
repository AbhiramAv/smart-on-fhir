import { useState, useEffect } from 'react';

interface UseFHIRProps {
    client: any;
    resourceType: string;
}

const useFHIR = ({ client, resourceType }: UseFHIRProps) => {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await client.request(resourceType);
                setData(response);
            } catch (err) {
                setError(err as Error);
            } finally {
                setLoading(false);
            }
        };

        if (client) {
            fetchData();
        }
    }, [client, resourceType]);

    return { data, loading, error };
};

export default useFHIR;
