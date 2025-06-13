import { CheckCircle, Home, ShoppingBag } from "lucide-react"
import Link from "next/link"
import { Suspense } from "react"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useCart } from "@/lib/store/CartContext"

interface CheckoutSuccessProps {
    params: { locale: string }
    searchParams: { session_id?: string }
}

function CheckoutSuccessContent({ sessionId, locale }: { sessionId: string | undefined, locale: string }) {
    return (
        <div className="container max-w-md mx-auto py-12 px-4 mt-32">
            <Card className="border-green-100 shadow-lg">
                <CardHeader className="pb-4 text-center">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                        <CheckCircle className="h-10 w-10 text-green-600" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-green-700">Payment Successful!</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                    <Alert className="bg-green-50 border-green-200 mb-6">
                        <AlertTitle className="text-green-800">Order Confirmed</AlertTitle>
                        <AlertDescription className="text-green-700">
                            Your order has been processed and will be shipped soon.
                        </AlertDescription>
                    </Alert>
                    <div className="space-y-2 text-muted-foreground">
                        <p>A confirmation email has been sent to your inbox.</p>
                    </div>
                </CardContent>
                <CardFooter className="flex flex-col space-y-3">
                    <Button asChild className="w-full">
                        <Link href={`/${locale}/orders`}>
                            <ShoppingBag className="mr-2 h-4 w-4" />
                            View Order Details
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

export default async function CheckoutSuccess({ params, searchParams }: CheckoutSuccessProps) {
    const { locale } = await params
    const { session_id } = await searchParams

    return (
        <Suspense fallback={
            <div className="container max-w-md mx-auto py-12 px-4">
                <div className="animate-pulse">Loading...</div>
            </div>
        }>
            <CheckoutSuccessContent sessionId={session_id} locale={locale} />
        </Suspense>
        
    )
}