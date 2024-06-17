
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
    name: z.string().min(2, {
        message: "Necessário mais que dois caracteres.",
    }),
    email: z.string().email({
        message: "Digite o email correto"
    }),
})

export default function Saveshool() {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: { //valor que aparece por padrão
            name: "Genilso",
            email: "genilsocarraro@gmail.com",
        },
    })

    async function onSubmit(shool: z.infer<typeof FormSchema>) {
        const requestOptions= {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(shool)
        }
        const response = await fetch("https://server20241-six.vercel.app/boocks", requestOptions)
        form.reset();
        alert("Estudante Cadastrado!")
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nome:</FormLabel>
                            <FormControl>
                                <Input placeholder="Digite o nome do estudante" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email:</FormLabel>
                            <FormControl>
                                <Input placeholder="Digite o email do estudante" {...field} />
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