"use client"

import Heading from "@/components/ui/Heading";
import OrderCard from "@/components/order/OrderCard";
import useSWR from "swr";
import { OrderWithProducts } from "@/src/types";


export default function OrdersPage() {

    const url = '/admin/orders/api'
    const fetcher = () => fetch(url).then(res => res.json()).then(data => data)
    const { data, error, isLoading } = useSWR<OrderWithProducts[]>(url, fetcher, {
        refreshInterval: 10000,
        revalidateOnFocus: false
    })

    if (isLoading) return <p>Cargando...</p>

    if (data) return (
        <>
            <Heading>
                Administrar Ordenes
            </Heading>

            {data.length ? (
                <div className="grid grid-cols-1 lg:grid-cols-3 2xl:grid-cols-4 gap-5 mt-5">
                    {data.map(order => (
                        <OrderCard
                            key={order.id}
                            order={order}
                        />
                    ))}
                </div>
            ) : <p className="text-center">No hay ordenes Pendientes</p>}
        </>
    )
}
