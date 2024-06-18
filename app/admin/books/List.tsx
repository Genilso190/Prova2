import { Button } from "@/components/ui/button"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { revalidatePath } from "next/cache"

  interface IBook{
    id:number,
    title:string,
    description: string,
  }
  
  export default async function ListBook() {
    const books = await list()
    async function list(){
      revalidatePath("/admin/book")
      const response = await fetch("https://server20241-beige.vercel.app/courses")
        return response.json();
    }

    async function deleteBook(formData: FormData) {
      "use server"
      const id = formData.get("id") as string;
      const response = await fetch("https://server20241-beige.vercel.app/courses/"+id, {method: "DELETE"});
      revalidatePath("/admin/book")
  
    }

    return (
      <Table>
        <TableCaption>Lista de Livro</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Nome</TableHead>
            <TableHead>description</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {books.map((item:IBook) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium">{item.id}</TableCell>
              <TableCell>{item.title}</TableCell>
              <TableCell>
              <form>
                <input type="text" hidden title="id" value={item.id} />
                <Button variant="destructive" formAction={deleteBook}>EXCLUIR</Button>
              </form>
            </TableCell>
            </TableRow>
          ))}
        </TableBody>
       
      </Table>
    )
  }
  