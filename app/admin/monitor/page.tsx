import { Button } from "@/components/ui/button";
import ListMonitor from "./List";

export default function Monitor() {
    return (
        <div className="w-full flex flex-col  mt-6">
            <div className="flex justify-center mb-6">
                <a href="/admin/monitor/new">
                    <Button>Cadastrar Marca</Button>
                </a>
            </div>
            <ListMonitor />
        </div>
    )
}