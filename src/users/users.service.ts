import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  create(email: string, password: string) {
    const user = this.repo.create({ email, password });

    return this.repo.save(user);
  }

  find(email: string) {
    return this.repo.find({ email });
  }

  async findById(id: number) {
    const user = await this.repo.findOne(id);

    if (!user) throw new NotFoundException('User not found');

    return user;
  }

  async update(id: number, attrs: Partial<User>) {
    const user = await this.findById(id);

    if (!user) throw new NotFoundException('User not found');

    Object.assign(user, attrs);

    return this.repo.save(user);
  }

  async remove(id: number) {
    const user = await this.findById(id);

    if (!user) throw new NotFoundException('User not found');

    return this.repo.remove(user);
  }
}
