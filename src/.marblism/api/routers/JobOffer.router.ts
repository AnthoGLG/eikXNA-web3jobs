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

        createMany: procedure.input($Schema.JobOfferInputSchema.createMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).jobOffer.createMany(input as any))),

        create: procedure.input($Schema.JobOfferInputSchema.create).mutation(async ({ ctx, input }) => checkMutate(db(ctx).jobOffer.create(input as any))),

        deleteMany: procedure.input($Schema.JobOfferInputSchema.deleteMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).jobOffer.deleteMany(input as any))),

        delete: procedure.input($Schema.JobOfferInputSchema.delete).mutation(async ({ ctx, input }) => checkMutate(db(ctx).jobOffer.delete(input as any))),

        findFirst: procedure.input($Schema.JobOfferInputSchema.findFirst).query(({ ctx, input }) => checkRead(db(ctx).jobOffer.findFirst(input as any))),

        findMany: procedure.input($Schema.JobOfferInputSchema.findMany).query(({ ctx, input }) => checkRead(db(ctx).jobOffer.findMany(input as any))),

        findUnique: procedure.input($Schema.JobOfferInputSchema.findUnique).query(({ ctx, input }) => checkRead(db(ctx).jobOffer.findUnique(input as any))),

        updateMany: procedure.input($Schema.JobOfferInputSchema.updateMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).jobOffer.updateMany(input as any))),

        update: procedure.input($Schema.JobOfferInputSchema.update).mutation(async ({ ctx, input }) => checkMutate(db(ctx).jobOffer.update(input as any))),

        count: procedure.input($Schema.JobOfferInputSchema.count).query(({ ctx, input }) => checkRead(db(ctx).jobOffer.count(input as any))),

    }
    );
}

export interface ClientType<AppRouter extends AnyRouter, Context = AppRouter['_def']['_config']['$types']['ctx']> {
    createMany: {

        useMutation: <T extends Prisma.JobOfferCreateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.JobOfferCreateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.JobOfferCreateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.JobOfferCreateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    create: {

        useMutation: <T extends Prisma.JobOfferCreateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.JobOfferCreateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.JobOfferGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.JobOfferGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.JobOfferCreateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.JobOfferCreateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.JobOfferGetPayload<T>, Context>) => Promise<Prisma.JobOfferGetPayload<T>>
            };

    };
    deleteMany: {

        useMutation: <T extends Prisma.JobOfferDeleteManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.JobOfferDeleteManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.JobOfferDeleteManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.JobOfferDeleteManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    delete: {

        useMutation: <T extends Prisma.JobOfferDeleteArgs>(opts?: UseTRPCMutationOptions<
            Prisma.JobOfferDeleteArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.JobOfferGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.JobOfferGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.JobOfferDeleteArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.JobOfferDeleteArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.JobOfferGetPayload<T>, Context>) => Promise<Prisma.JobOfferGetPayload<T>>
            };

    };
    findFirst: {

        useQuery: <T extends Prisma.JobOfferFindFirstArgs, TData = Prisma.JobOfferGetPayload<T>>(
            input: Prisma.SelectSubset<T, Prisma.JobOfferFindFirstArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.JobOfferGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.JobOfferFindFirstArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.JobOfferFindFirstArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.JobOfferGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.JobOfferGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findMany: {

        useQuery: <T extends Prisma.JobOfferFindManyArgs, TData = Array<Prisma.JobOfferGetPayload<T>>>(
            input: Prisma.SelectSubset<T, Prisma.JobOfferFindManyArgs>,
            opts?: UseTRPCQueryOptions<string, T, Array<Prisma.JobOfferGetPayload<T>>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.JobOfferFindManyArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.JobOfferFindManyArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Array<Prisma.JobOfferGetPayload<T>>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Array<Prisma.JobOfferGetPayload<T>>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findUnique: {

        useQuery: <T extends Prisma.JobOfferFindUniqueArgs, TData = Prisma.JobOfferGetPayload<T>>(
            input: Prisma.SelectSubset<T, Prisma.JobOfferFindUniqueArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.JobOfferGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.JobOfferFindUniqueArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.JobOfferFindUniqueArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.JobOfferGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.JobOfferGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    updateMany: {

        useMutation: <T extends Prisma.JobOfferUpdateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.JobOfferUpdateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.JobOfferUpdateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.JobOfferUpdateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    update: {

        useMutation: <T extends Prisma.JobOfferUpdateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.JobOfferUpdateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.JobOfferGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.JobOfferGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.JobOfferUpdateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.JobOfferUpdateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.JobOfferGetPayload<T>, Context>) => Promise<Prisma.JobOfferGetPayload<T>>
            };

    };
    count: {

        useQuery: <T extends Prisma.JobOfferCountArgs, TData = 'select' extends keyof T
            ? T['select'] extends true
            ? number
            : Prisma.GetScalarType<T['select'], Prisma.JobOfferCountAggregateOutputType>
            : number>(
                input: Prisma.Subset<T, Prisma.JobOfferCountArgs>,
                opts?: UseTRPCQueryOptions<string, T, 'select' extends keyof T
                    ? T['select'] extends true
                    ? number
                    : Prisma.GetScalarType<T['select'], Prisma.JobOfferCountAggregateOutputType>
                    : number, TData, Error>
            ) => UseTRPCQueryResult<
                TData,
                TRPCClientErrorLike<AppRouter>
            >;
        useInfiniteQuery: <T extends Prisma.JobOfferCountArgs>(
            input: Omit<Prisma.Subset<T, Prisma.JobOfferCountArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, 'select' extends keyof T
                ? T['select'] extends true
                ? number
                : Prisma.GetScalarType<T['select'], Prisma.JobOfferCountAggregateOutputType>
                : number, Error>
        ) => UseTRPCInfiniteQueryResult<
            'select' extends keyof T
            ? T['select'] extends true
            ? number
            : Prisma.GetScalarType<T['select'], Prisma.JobOfferCountAggregateOutputType>
            : number,
            TRPCClientErrorLike<AppRouter>
        >;

    };
}
