import { AppDataSource } from "./data-source"
import { User } from "./entity/User"
import {Department} from "./entity/Department";
import {Employee} from "./entity/Employee";

AppDataSource.initialize().then(async () => {
  /**
   * create data，
   * 一对多
   */
  // const d1 =new Department()
  // d1.name = '技术部'
  //
  // const e1 = new Employee()
  // e1.name = '张三'
  // e1.department = d1
  // const e2 = new Employee();
  // e2.name = '李四';
  // e2.department = d1;
  //
  // const e3 = new Employee();
  // e3.name = '王五';
  // e3.department = d1;
  //
  // // 当然，如果是设置了 cascade，那就只需要保存 empolyee 就好
  // // await AppDataSource.manager.save(Department, d1)
  // await AppDataSource.manager.save(Employee, [e1,e2,e3])

  /**
   * 多对1
   */

  // const e1 = new Employee();
  // e1.name = '张三';
  //
  // const e2 = new Employee();
  // e2.name = '李四';
  //
  // const e3 = new Employee();
  // e3.name = '王五';
  //
  // const d1 = new Department();
  // d1.name = '技术部';
  // d1.employees = [e1, e2, e3];
  //
  // await AppDataSource.manager.save(Department, d1);

  /**
   * 查询
   */
  // const deps = await AppDataSource.manager.find(Department,
  //     {
  //       relations:{
  //         employees: true
  //       }
  //     })
  // console.log(deps)
  // console.log(deps.map(item => item.employees))
// relations 其实就是 left join on，或者通过 query builder 来手动关联
//   const es = await AppDataSource.manager.getRepository(Department)
//     .createQueryBuilder('d')
//     .leftJoinAndSelect('d.employees', 'e')
//     .getMany();
//
//   console.log(es);
//   console.log(es.map(item => item.employees))
//   直接用 EntityManager 来创建 query builder
  const es = await AppDataSource.manager
    .createQueryBuilder(Department, 'd')
    .leftJoinAndSelect('d.employees', 'e')
    .getMany();

  console.log(es);
  console.log(es.map(item => item.employees))

  /**
   * 删除
   */
  // const deps = await AppDataSource.manager.find(Department, {
  //   relations: {
  //     employees: true
  //   }
  // });
  // await AppDataSource.manager.delete(Employee, deps[0].employees);
  // await AppDataSource.manager.delete(Department, deps[0].id);
  // 如果你设置了 onDelete 为 SET NULL 或者 CASCADE，就不用自己删 employee 了，只要删了 department，
  // mysql 会自动把关联的 employee 记录删除，或者是把它们的外键 id 置为空。

}).catch(error => console.log(error))
