export class Task {

   constructor( 
    public title: string,
    public assignedTo: string,
    public createdAt: string,
    public priority: string,
    public status: string,
    public id?: string,
){
    
}

}
