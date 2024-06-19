"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const FormSchema = z.object({
    branch: z.string().min(2, {
        message: "Necessário mais que dois caracteres.",
    }),
})

export default function SaveMonitor() {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: { //valor que aparece por padrão
            branch: "lenovo",
        },
    })

    async function onSubmit(monitor: z.infer<typeof FormSchema>) {
        const requestOptions= {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(monitor)
        }
        const response = await fetch("https://server20241-beige.vercel.app/monitor", requestOptions)
        form.reset();
        alert("Marca Cadastrado!")
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
                <FormField
                    control={form.control}
                    name="branch"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nome:</FormLabel>
                            <FormControl>
                                <Input placeholder="Digite a marca do monitor" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Salvar</Button>
            </form>
        </Form>
    )
}