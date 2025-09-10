import { IsNotEmpty } from 'class-validator';

export class TodoDto {
  @IsNotEmpty({
    always: true,
    message: 'Title Of Todo May Not Be Empty This Is Pre Condition of TodoDto',
  }) //this somehow saves us from 500 error and instead throws 400
  title: string;
  //never will status be empty it be active
  status: 'active' | 'completed' = 'active';
}
