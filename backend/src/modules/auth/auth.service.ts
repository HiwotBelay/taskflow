import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { TeamMember } from '../team-members/entities/team-member.entity';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(TeamMember)
    private teamMemberRepository: Repository<TeamMember>,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.teamMemberRepository.findOne({
      where: { email },
    });

    if (user && (await bcrypt.compare(password, user.passwordHash))) {
      const { passwordHash, ...result } = user;
      return result;
    }
    return null;
  }

  async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto.email, loginDto.password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    };
  }

  async register(registerDto: RegisterDto) {
    try {
      const existingUser = await this.teamMemberRepository.findOne({
        where: { email: registerDto.email },
      });

      if (existingUser) {
        throw new UnauthorizedException('User with this email already exists');
      }

      const passwordHash = await bcrypt.hash(registerDto.password, 10);

      const user = this.teamMemberRepository.create({
        name: registerDto.name,
        email: registerDto.email,
        passwordHash,
        role: registerDto.role || 'Developer',
        phone: registerDto.phone || null,
      });

      const savedUser = await this.teamMemberRepository.save(user);

      const payload = { email: savedUser.email, sub: savedUser.id };
      return {
        access_token: this.jwtService.sign(payload),
        user: {
          id: savedUser.id,
          name: savedUser.name,
          email: savedUser.email,
          role: savedUser.role,
        },
      };
    } catch (error) {
      // Log the error for debugging
      console.error('Registration error:', error);
      
      // Re-throw known exceptions
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      
      // Handle database errors
      if (error.code === '23505') { // PostgreSQL unique constraint violation
        throw new UnauthorizedException('User with this email already exists');
      }
      
      // Handle other errors
      throw new UnauthorizedException(
        error.message || 'Failed to create user account. Please try again.',
      );
    }
  }
}





