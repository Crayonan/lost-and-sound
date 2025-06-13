"use client";

import { useEffect, useState } from "react";
import { AlertCircle, Home, RefreshCw } from "lucide-react"
import Link from "next/link"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

interface CheckoutCancelProps {
    params: { locale: string }
}

export default function CheckoutCancel({ params }: CheckoutCancelProps) {
    const { locale } = params;
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [message, setMessage] = useState<string>("");

    useEffect(() => {
        const orderId = localStorage.getItem("checkoutOrderId");
        if (!orderId) {
            setStatus("error");
            setMessage("No order found to cancel.");
            return;
        }
        setStatus("loading");
        fetch(`http://localhost:3000/api/cancel-order`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ orderId }),
        })
            .then(async (res) => {
                const data = await res.json();
                if (res.ok) {
                    setStatus("success");
                    setMessage(data.message || "Order cancelled.");
                    localStorage.removeItem("checkoutOrderId");
                } else {
                    setStatus("error");
                    setMessage(data.message || "Failed to cancel order.");
                }
            })
            .catch(() => {
                setStatus("error");
                setMessage("Failed to cancel order.");
            });
    }, []);

    return (
        <div className="container max-w-md mx-auto py-12 px-4 mt-32">
            <Card className="border-amber-100 shadow-lg">
                <CardHeader className="pb-4 text-center">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-amber-100">
                        <AlertCircle className="h-10 w-10 text-amber-600" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-amber-700">Payment Cancelled</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                    <Alert className="bg-amber-50 border-amber-200 mb-6">
                        <AlertTitle>Order Not Completed</AlertTitle>
                        <AlertDescription>
                            {status === "loading" && "Cancelling your order..."}
                            {status !== "loading" && message ? message : "Your payment was cancelled and no charges were made."}
                        </AlertDescription>
                    </Alert>
                    <div className="space-y-2 text-muted-foreground">
                        <p>Your cart items have been saved.</p>
                        <p>If you experienced any issues, please contact our support team.</p>
                    </div>
                </CardContent>
                <CardFooter className="flex flex-col space-y-3">
                    <Button asChild className="w-full">
                        <Link href={`/${locale}/store`}>
                            <RefreshCw className="mr-2 h-4 w-4" />
                            Continue Shopping
                        </Link>
                    </Button>
                    <Button asChild variant="outline" className="w-full">
                        <Link href={`/${locale}`}>
                            <Home className="mr-2 h-4 w-4" />
                            Return to Home
                        </Link>
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}