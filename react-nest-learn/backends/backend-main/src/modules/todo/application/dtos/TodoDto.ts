import { IsNotEmpty, Length } from 'class-validator';

export class TodoDto {
  @Length(2, 9999, {
    message: 'May the title of your todo have min 2 characters ',
    always: false,
  })
  @IsNotEmpty({
    always: true,
    message: 'Title Of Todo May Not Be Empty This Is Pre Condition of TodoDto',
  }) //this somehow saves us from 500 error
  title: string;
  status: 'active' | 'completed'='active';
}
