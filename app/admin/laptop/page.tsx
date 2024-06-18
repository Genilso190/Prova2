import { Button } from "@/components/ui/button";
import ListBook from "./List";

export default function Boock() {
    return (
        <div className="w-full flex flex-col  mt-6">
            <div className="flex justify-center mb-6">
                <a href="/admin/books/new">
                    <Button>Cadastrar Livro</Button>
                </a>
            </div>
            <ListBook />
        </div>
    )
}