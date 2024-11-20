/* eslint-disable */
import { type RouterFactory, type ProcBuilder, type BaseConfig, db } from ".";
import * as _Schema from '@zenstackhq/runtime/zod/input';
const $Schema: typeof _Schema = (_Schema as any).default ?? _Schema;
import { checkRead, checkMutate } from '../helper';
import type { Prisma } from '@prisma/client';
import type { UseTRPCMutationOptions, UseTRPCMutationResult, UseTRPCQueryOptions, UseTRPCQueryResult, UseTRPCInfiniteQueryOptions, UseTRPCInfiniteQueryResult } from '@trpc/react-query/shared';
import type { TRPCClientErrorLike } from '@trpc/client';
import type { AnyRouter } from '@trpc/server';

export default function createRouter<Config extends BaseConfig>(router: RouterFactory<Config>, procedure: ProcBuilder<Config>) {
    return router({

        createMany: procedure.input($Schema.CompanyInputSchema.createMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).company.createMany(input as any))),

        create: procedure.input($Schema.CompanyInputSchema.create).mutation(async ({ ctx, input }) => checkMutate(db(ctx).company.create(input as any))),

        deleteMany: procedure.input($Schema.CompanyInputSchema.deleteMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).company.deleteMany(input as any))),

        delete: procedure.input($Schema.CompanyInputSchema.delete).mutation(async ({ ctx, input }) => checkMutate(db(ctx).company.delete(input as any))),

        findFirst: procedure.input($Schema.CompanyInputSchema.findFirst).query(({ ctx, input }) => checkRead(db(ctx).company.findFirst(input as any))),

        findMany: procedure.input($Schema.CompanyInputSchema.findMany).query(({ ctx, input }) => checkRead(db(ctx).company.findMany(input as any))),

        findUnique: procedure.input($Schema.CompanyInputSchema.findUnique).query(({ ctx, input }) => checkRead(db(ctx).company.findUnique(input as any))),

        updateMany: procedure.input($Schema.CompanyInputSchema.updateMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).company.updateMany(input as any))),

        update: procedure.input($Schema.CompanyInputSchema.update).mutation(async ({ ctx, input }) => checkMutate(db(ctx).company.update(input as any))),

        count: procedure.input($Schema.CompanyInputSchema.count).query(({ ctx, input }) => checkRead(db(ctx).company.count(input as any))),

    }
    );
}

export interface ClientType<AppRouter extends AnyRouter, Context = AppRouter['_def']['_config']['$types']['ctx']> {
    createMany: {

        useMutation: <T extends Prisma.CompanyCreateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.CompanyCreateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.CompanyCreateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.CompanyCreateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    create: {

        useMutation: <T extends Prisma.CompanyCreateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.CompanyCreateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.CompanyGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.CompanyGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.CompanyCreateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.CompanyCreateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.CompanyGetPayload<T>, Context>) => Promise<Prisma.CompanyGetPayload<T>>
            };

    };
    deleteMany: {

        useMutation: <T extends Prisma.CompanyDeleteManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.CompanyDeleteManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.CompanyDeleteManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.CompanyDeleteManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    delete: {

        useMutation: <T extends Prisma.CompanyDeleteArgs>(opts?: UseTRPCMutationOptions<
            Prisma.CompanyDeleteArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.CompanyGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.CompanyGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.CompanyDeleteArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.CompanyDeleteArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.CompanyGetPayload<T>, Context>) => Promise<Prisma.CompanyGetPayload<T>>
            };

    };
    findFirst: {

        useQuery: <T extends Prisma.CompanyFindFirstArgs, TData = Prisma.CompanyGetPayload<T>>(
            input: Prisma.SelectSubset<T, Prisma.CompanyFindFirstArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.CompanyGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.CompanyFindFirstArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.CompanyFindFirstArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.CompanyGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.CompanyGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findMany: {

        useQuery: <T extends Prisma.CompanyFindManyArgs, TData = Array<Prisma.CompanyGetPayload<T>>>(
            input: Prisma.SelectSubset<T, Prisma.CompanyFindManyArgs>,
            opts?: UseTRPCQueryOptions<string, T, Array<Prisma.CompanyGetPayload<T>>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.CompanyFindManyArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.CompanyFindManyArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Array<Prisma.CompanyGetPayload<T>>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Array<Prisma.CompanyGetPayload<T>>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findUnique: {

        useQuery: <T extends Prisma.CompanyFindUniqueArgs, TData = Prisma.CompanyGetPayload<T>>(
            input: Prisma.SelectSubset<T, Prisma.CompanyFindUniqueArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.CompanyGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.CompanyFindUniqueArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.CompanyFindUniqueArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.CompanyGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.CompanyGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    updateMany: {

        useMutation: <T extends Prisma.CompanyUpdateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.CompanyUpdateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.CompanyUpdateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.CompanyUpdateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    update: {

        useMutation: <T extends Prisma.CompanyUpdateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.CompanyUpdateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.CompanyGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.CompanyGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.CompanyUpdateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.CompanyUpdateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.CompanyGetPayload<T>, Context>) => Promise<Prisma.CompanyGetPayload<T>>
            };

    };
    count: {

        useQuery: <T extends Prisma.CompanyCountArgs, TData = 'select' extends keyof T
            ? T['select'] extends true
            ? number
            : Prisma.GetScalarType<T['select'], Prisma.CompanyCountAggregateOutputType>
            : number>(
                input: Prisma.Subset<T, Prisma.CompanyCountArgs>,
                opts?: UseTRPCQueryOptions<string, T, 'select' extends keyof T
                    ? T['select'] extends true
                    ? number
                    : Prisma.GetScalarType<T['select'], Prisma.CompanyCountAggregateOutputType>
                    : number, TData, Error>
            ) => UseTRPCQueryResult<
                TData,
                TRPCClientErrorLike<AppRouter>
            >;
        useInfiniteQuery: <T extends Prisma.CompanyCountArgs>(
            input: Omit<Prisma.Subset<T, Prisma.CompanyCountArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, 'select' extends keyof T
                ? T['select'] extends true
                ? number
                : Prisma.GetScalarType<T['select'], Prisma.CompanyCountAggregateOutputType>
                : number, Error>
        ) => UseTRPCInfiniteQueryResult<
            'select' extends keyof T
            ? T['select'] extends true
            ? number
            : Prisma.GetScalarType<T['select'], Prisma.CompanyCountAggregateOutputType>
            : number,
            TRPCClientErrorLike<AppRouter>
        >;

    };
}
