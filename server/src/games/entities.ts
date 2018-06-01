import { BaseEntity, PrimaryGeneratedColumn, Column, Entity, Index, OneToMany, ManyToOne } from 'typeorm'
import User from '../users/entity'

export type Symbol = '0' | '1' | '2' | '3'
export type Row = [ Symbol, Symbol,Symbol,Symbol,Symbol,Symbol,Symbol,Symbol,Symbol,Symbol]
export type Board = [ Row, Row, Row, Row, Row, Row, Row, Row, Row, Row ]

type Status = 'pending' | 'started' | 'finished'

// const emptyRow: Row = [null, null, null, null, null, null, null, null, null, null]
const emptyBoard: Board = [
    ['0','0','0','0','0','0','0','0','0','0'],
    ['1','1','1','1','1','0','0','0','0','0'],
    ['0','0','0','0','0','0','0','1','0','0'],
    ['0','0','0','0','0','0','0','1','0','0'],
    ['0','0','1','0','0','0','0','0','0','0'],
    ['0','0','1','0','0','0','0','0','1','0'],
    ['0','0','1','0','0','0','0','0','1','0'],
    ['0','0','0','1','1','1','0','0','1','0'],
    ['0','0','0','0','0','0','0','0','1','0'],
    ['0','0','0','0','0','0','0','0','0','0']

// const shipBoard01 = [
//   ['0','0','0','0','0','0','0','0','0','0'],
//   ['1','1','1','1','1','0','0','0','0','0'],
//   ['0','0','0','0','0','0','0','1','0','0'],
//   ['0','0','0','0','0','0','0','1','0','0'],
//   ['0','0','1','0','0','0','0','0','0','0'],
//   ['0','0','1','0','0','0','0','0','1','0'],
//   ['0','0','1','0','0','0','0','0','1','0'],
//   ['0','0','0','1','1','1','0','0','1','0'],
//   ['0','0','0','0','0','0','0','0','1','0'],
//   ['0','0','0','0','0','0','0','0','0','0']

]

//const emptyBoard: Board = shipBoard01

@Entity()
export class Game extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @Column('json', {default: emptyBoard})
  board: Board

  @Column('char', {length:1, default: '0'})
  turn: Symbol

  @Column('char', {length:1, nullable: true})
  winner: Symbol

  @Column('text', {default: 'pending'})
  status: Status

  // this is a relation, read more about them here:
  // http://typeorm.io/#/many-to-one-one-to-many-relations
  @OneToMany(_ => Player, player => player.game, {eager:true})
  players: Player[]
}

@Entity()
@Index(['game', 'user', 'symbol'], {unique:true})
export class Player extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @ManyToOne(_ => User, user => user.players)
  user: User

  @ManyToOne(_ => Game, game => game.players)
  game: Game

  @Column()
  userId: number

  @Column('char', {length: 1})
  symbol: Symbol
}
