import Cliente from "@/src/core/Cliente";
import { db } from "../firebaseConfig";
import { collection, getDocs, doc, DocumentData, deleteDoc, setDoc, QueryDocumentSnapshot } from "firebase/firestore";
import ClienteRepositorio from "../../core/ClienteRepositorio";

const clientesCollection = collection(db, "clientes");

const clienteConverter = {
    toFirestore(cliente: Cliente): DocumentData {
        return cliente.toFirestore();
    },
    fromFirestore(snapshot: QueryDocumentSnapshot): Cliente {
        const data = snapshot.data();
        return Cliente.fromFirestore({
            id: snapshot.id,
            nome: data.nome,
            idade: data.idade
        });
    }
};

export default class ColecaoCliente implements ClienteRepositorio {
    async salvar(cliente: Cliente): Promise<Cliente> {
        const docRef = cliente.id
            ? doc(clientesCollection, cliente.id) 
            : doc(clientesCollection); 
    
        await setDoc(docRef, cliente.toFirestore());
        console.log("Cliente a ser salvo:", cliente);
    
        return new Cliente(cliente.nome, cliente.idade, docRef.id);
    }

    async excluir(cliente: Cliente): Promise<void> {
        if (!cliente.id) throw new Error("ID do cliente não encontrado.");
        const docRef = doc(clientesCollection, cliente.id);
        await deleteDoc(docRef);

    }

    async obterTodos(): Promise<Cliente[]> {
        const snapshot = await getDocs(clientesCollection.withConverter(clienteConverter));
        return snapshot.docs.map(doc => doc.data() ?? []);
    }

    
    
}