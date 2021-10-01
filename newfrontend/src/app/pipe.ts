import { PipeTransform ,Pipe} from "@angular/core"

@Pipe({

    name : 'pipee'
}
)

export class pipe implements PipeTransform{
    transform(object:any=[]):any{

        return Object.values(object);
    }
}