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

  interface IMonitor{
    id:number,
    name:string,
  }
  
  export default async function ListMonitor() {
    const monitor = await list()
    async function list(){
      revalidatePath("/admin/monitor")
      const response = await fetch("https://server20241-beige.vercel.app/monitor");
        return response.json();
    }

    async function deleteMonitor(formData: FormData) {
      "use server"
      const id = formData.get("id") as string;
      const response = await fetch("https://server20241-beige.vercel.app/monitor/"+id, {method: "DELETE"});
      revalidatePath("/admin/monitor")
  
    }

    return (
      <Table>
        <TableCaption>Lista de Monitores</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Nome</TableHead>
            <TableHead>Ação</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {monitor.map((item:IMonitor) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium">{item.id}</TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>
              <form>
                <input type="text" hidden name="id" value={item.id} />
                <Button variant="destructive" formAction={deleteMonitor}>EXCLUIR</Button>
              </form>
            </TableCell>
            </TableRow>
          ))}
        </TableBody>
       
      </Table>
    )
  }
  