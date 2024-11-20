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

        createMany: procedure.input($Schema.ApplicationInputSchema.createMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).application.createMany(input as any))),

        create: procedure.input($Schema.ApplicationInputSchema.create).mutation(async ({ ctx, input }) => checkMutate(db(ctx).application.create(input as any))),

        deleteMany: procedure.input($Schema.ApplicationInputSchema.deleteMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).application.deleteMany(input as any))),

        delete: procedure.input($Schema.ApplicationInputSchema.delete).mutation(async ({ ctx, input }) => checkMutate(db(ctx).application.delete(input as any))),

        findFirst: procedure.input($Schema.ApplicationInputSchema.findFirst).query(({ ctx, input }) => checkRead(db(ctx).application.findFirst(input as any))),

        findMany: procedure.input($Schema.ApplicationInputSchema.findMany).query(({ ctx, input }) => checkRead(db(ctx).application.findMany(input as any))),

        findUnique: procedure.input($Schema.ApplicationInputSchema.findUnique).query(({ ctx, input }) => checkRead(db(ctx).application.findUnique(input as any))),

        updateMany: procedure.input($Schema.ApplicationInputSchema.updateMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).application.updateMany(input as any))),

        update: procedure.input($Schema.ApplicationInputSchema.update).mutation(async ({ ctx, input }) => checkMutate(db(ctx).application.update(input as any))),

        count: procedure.input($Schema.ApplicationInputSchema.count).query(({ ctx, input }) => checkRead(db(ctx).application.count(input as any))),

    }
    );
}

export interface ClientType<AppRouter extends AnyRouter, Context = AppRouter['_def']['_config']['$types']['ctx']> {
    createMany: {

        useMutation: <T extends Prisma.ApplicationCreateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.ApplicationCreateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.ApplicationCreateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.ApplicationCreateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    create: {

        useMutation: <T extends Prisma.ApplicationCreateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.ApplicationCreateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.ApplicationGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.ApplicationGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.ApplicationCreateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.ApplicationCreateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.ApplicationGetPayload<T>, Context>) => Promise<Prisma.ApplicationGetPayload<T>>
            };

    };
    deleteMany: {

        useMutation: <T extends Prisma.ApplicationDeleteManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.ApplicationDeleteManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.ApplicationDeleteManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.ApplicationDeleteManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    delete: {

        useMutation: <T extends Prisma.ApplicationDeleteArgs>(opts?: UseTRPCMutationOptions<
            Prisma.ApplicationDeleteArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.ApplicationGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.ApplicationGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.ApplicationDeleteArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.ApplicationDeleteArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.ApplicationGetPayload<T>, Context>) => Promise<Prisma.ApplicationGetPayload<T>>
            };

    };
    findFirst: {

        useQuery: <T extends Prisma.ApplicationFindFirstArgs, TData = Prisma.ApplicationGetPayload<T>>(
            input: Prisma.SelectSubset<T, Prisma.ApplicationFindFirstArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.ApplicationGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.ApplicationFindFirstArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.ApplicationFindFirstArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.ApplicationGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.ApplicationGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findMany: {

        useQuery: <T extends Prisma.ApplicationFindManyArgs, TData = Array<Prisma.ApplicationGetPayload<T>>>(
            input: Prisma.SelectSubset<T, Prisma.ApplicationFindManyArgs>,
            opts?: UseTRPCQueryOptions<string, T, Array<Prisma.ApplicationGetPayload<T>>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.ApplicationFindManyArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.ApplicationFindManyArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Array<Prisma.ApplicationGetPayload<T>>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Array<Prisma.ApplicationGetPayload<T>>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findUnique: {

        useQuery: <T extends Prisma.ApplicationFindUniqueArgs, TData = Prisma.ApplicationGetPayload<T>>(
            input: Prisma.SelectSubset<T, Prisma.ApplicationFindUniqueArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.ApplicationGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.ApplicationFindUniqueArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.ApplicationFindUniqueArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.ApplicationGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.ApplicationGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    updateMany: {

        useMutation: <T extends Prisma.ApplicationUpdateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.ApplicationUpdateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.ApplicationUpdateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.ApplicationUpdateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    update: {

        useMutation: <T extends Prisma.ApplicationUpdateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.ApplicationUpdateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.ApplicationGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.ApplicationGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.ApplicationUpdateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.ApplicationUpdateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.ApplicationGetPayload<T>, Context>) => Promise<Prisma.ApplicationGetPayload<T>>
            };

    };
    count: {

        useQuery: <T extends Prisma.ApplicationCountArgs, TData = 'select' extends keyof T
            ? T['select'] extends true
            ? number
            : Prisma.GetScalarType<T['select'], Prisma.ApplicationCountAggregateOutputType>
            : number>(
                input: Prisma.Subset<T, Prisma.ApplicationCountArgs>,
                opts?: UseTRPCQueryOptions<string, T, 'select' extends keyof T
                    ? T['select'] extends true
                    ? number
                    : Prisma.GetScalarType<T['select'], Prisma.ApplicationCountAggregateOutputType>
                    : number, TData, Error>
            ) => UseTRPCQueryResult<
                TData,
                TRPCClientErrorLike<AppRouter>
            >;
        useInfiniteQuery: <T extends Prisma.ApplicationCountArgs>(
            input: Omit<Prisma.Subset<T, Prisma.ApplicationCountArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, 'select' extends keyof T
                ? T['select'] extends true
                ? number
                : Prisma.GetScalarType<T['select'], Prisma.ApplicationCountAggregateOutputType>
                : number, Error>
        ) => UseTRPCInfiniteQueryResult<
            'select' extends keyof T
            ? T['select'] extends true
            ? number
            : Prisma.GetScalarType<T['select'], Prisma.ApplicationCountAggregateOutputType>
            : number,
            TRPCClientErrorLike<AppRouter>
        >;

    };
}
