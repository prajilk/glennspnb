"use client";

import { ReactNode, useId, useRef, useState } from "react";
import {
    ColumnDef,
    ColumnFiltersState,
    FilterFn,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    useReactTable,
} from "@tanstack/react-table";
import {
    ChevronDownIcon,
    ChevronUpIcon,
    CircleAlertIcon,
    CircleXIcon,
    Eye,
    ListFilterIcon,
    PlusIcon,
    TrashIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { ProductDocument } from "@/models/types/product";
import Image from "next/image";
import Link from "next/link";
import { deleteProductsAction } from "@/actions/delete-product";
import { toast } from "sonner";

// Custom filter function for multi-column searching
const multiColumnFilterFn: FilterFn<ProductDocument> = (
    row,
    _,
    filterValue
) => {
    const searchableRowContent = `${row.original.productName}`.toLowerCase();
    const searchTerm = (filterValue ?? "").toLowerCase();
    return searchableRowContent.includes(searchTerm);
};

const columns: ColumnDef<ProductDocument>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) =>
                    table.toggleAllPageRowsSelected(!!value)
                }
                aria-label="Select all"
                className="bg-white"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        size: 28,
        enableSorting: false,
        enableHiding: false,
    },
    {
        header: "Product",
        accessorKey: "productName",
        cell: ({ row }) => (
            <div className="font-medium flex items-center gap-2">
                <Image
                    src={row.original.image.url}
                    alt={row.getValue("productName")}
                    width={50}
                    height={50}
                    className="rounded-full"
                />
                {row.getValue("productName")}
            </div>
        ),
        size: 250,
        filterFn: multiColumnFilterFn,
        enableHiding: false,
    },
    {
        header: "Product Title",
        accessorKey: "productTitle",
        size: 450,
    },
    {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => (
            <div className="flex items-center">
                <Link href={`/admin/dashboard/products/${row.original._id}`}>
                    <button className="p-2 rounded-lg hover:bg-zinc-200 cursor-pointer">
                        <Eye size={16} />
                    </button>
                </Link>
            </div>
        ),
        size: 60,
        enableHiding: false,
    },
];

export default function Component({
    productData,
}: {
    productData: ProductDocument[];
}) {
    const id = useId();
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const inputRef = useRef<HTMLInputElement>(null);

    const [data, setData] = useState<ProductDocument[]>(productData);

    const handleDeleteRows = async () => {
        const selectedRows = table.getSelectedRowModel().rows;

        const promise = async () => {
            const result = await deleteProductsAction(
                selectedRows.map((row) => row.original._id)
            );
            if (result.success) {
                return result;
            }
            throw result;
        };

        toast.promise(promise(), {
            loading: "Deleting products...",
            success: ({ message }) => {
                const updatedData = data.filter(
                    (item) =>
                        !selectedRows.some(
                            (row) => row.original._id === item._id
                        )
                );
                setData(updatedData);
                table.resetRowSelection();
                return message;
            },
            error: ({ error }) => (error ? error : "Something went wrong"),
        });
    };

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            columnFilters,
        },
    });

    return (
        <div className="space-y-4">
            {/* Filters */}
            <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                    {/* Filter by name or email */}
                    <div className="relative">
                        <Input
                            id={`${id}-input`}
                            ref={inputRef}
                            className={cn(
                                "peer min-w-60 ps-9",
                                Boolean(
                                    table
                                        .getColumn("productName")
                                        ?.getFilterValue()
                                ) && "pe-9"
                            )}
                            value={
                                (table
                                    .getColumn("productName")
                                    ?.getFilterValue() ?? "") as string
                            }
                            onChange={(e) =>
                                table
                                    .getColumn("productName")
                                    ?.setFilterValue(e.target.value)
                            }
                            placeholder="Filter by product"
                            type="text"
                            aria-label="Filter by product"
                        />
                        <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
                            <ListFilterIcon size={16} aria-hidden="true" />
                        </div>
                        {Boolean(
                            table.getColumn("productName")?.getFilterValue()
                        ) && (
                            <button
                                className="text-muted-foreground/80 hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md transition-[color,box-shadow] outline-none focus:z-10 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                                aria-label="Clear filter"
                                onClick={() => {
                                    table
                                        .getColumn("productName")
                                        ?.setFilterValue("");
                                    if (inputRef.current) {
                                        inputRef.current.focus();
                                    }
                                }}
                            >
                                <CircleXIcon size={16} aria-hidden="true" />
                            </button>
                        )}
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    {/* Delete button */}
                    {table.getSelectedRowModel().rows.length > 0 && (
                        <DeleteProduct
                            count={table.getSelectedRowModel().rows.length}
                            handleDeleteRows={handleDeleteRows}
                        >
                            <Button className="ml-auto" variant="outline">
                                <TrashIcon
                                    className="-ms-1 opacity-60"
                                    size={16}
                                    aria-hidden="true"
                                />
                                Delete
                                <span className="bg-background text-muted-foreground/70 -me-1 inline-flex h-5 max-h-full items-center rounded border px-1 font-[inherit] text-[0.625rem] font-medium">
                                    {table.getSelectedRowModel().rows.length}
                                </span>
                            </Button>
                        </DeleteProduct>
                    )}
                    {/* Add product button */}
                    <Link href={"/admin/dashboard/products/add"}>
                        <Button className="ml-auto cursor-pointer">
                            <PlusIcon
                                className="-ms-1"
                                size={16}
                                aria-hidden="true"
                            />
                            Add product
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Table */}
            <div className="bg-background overflow-hidden rounded-md border">
                <Table className="table-fixed">
                    <TableHeader className="bg-accent">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow
                                key={headerGroup.id}
                                className="hover:bg-transparent"
                            >
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead
                                            key={header.id}
                                            style={{
                                                width: `${header.getSize()}px`,
                                            }}
                                            className="h-11"
                                        >
                                            {header.isPlaceholder ? null : header.column.getCanSort() ? (
                                                <div
                                                    className={cn(
                                                        header.column.getCanSort() &&
                                                            "flex h-full cursor-pointer items-center justify-between gap-2 select-none"
                                                    )}
                                                    onClick={header.column.getToggleSortingHandler()}
                                                    onKeyDown={(e) => {
                                                        // Enhanced keyboard handling for sorting
                                                        if (
                                                            header.column.getCanSort() &&
                                                            (e.key ===
                                                                "Enter" ||
                                                                e.key === " ")
                                                        ) {
                                                            e.preventDefault();
                                                            header.column.getToggleSortingHandler()?.(
                                                                e
                                                            );
                                                        }
                                                    }}
                                                    tabIndex={
                                                        header.column.getCanSort()
                                                            ? 0
                                                            : undefined
                                                    }
                                                >
                                                    {flexRender(
                                                        header.column.columnDef
                                                            .header,
                                                        header.getContext()
                                                    )}
                                                    {{
                                                        asc: (
                                                            <ChevronUpIcon
                                                                className="shrink-0 opacity-60"
                                                                size={16}
                                                                aria-hidden="true"
                                                            />
                                                        ),
                                                        desc: (
                                                            <ChevronDownIcon
                                                                className="shrink-0 opacity-60"
                                                                size={16}
                                                                aria-hidden="true"
                                                            />
                                                        ),
                                                    }[
                                                        header.column.getIsSorted() as string
                                                    ] ?? null}
                                                </div>
                                            ) : (
                                                flexRender(
                                                    header.column.columnDef
                                                        .header,
                                                    header.getContext()
                                                )
                                            )}
                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={
                                        row.getIsSelected() && "selected"
                                    }
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell
                                            key={cell.id}
                                            className="last:py-0"
                                        >
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}

function DeleteProduct({
    children,
    count,
    handleDeleteRows,
}: {
    children: ReactNode;
    count: number;
    handleDeleteRows: () => void;
}) {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
            <AlertDialogContent>
                <div className="flex flex-col gap-2 max-sm:items-center sm:flex-row sm:gap-4">
                    <div
                        className="flex size-9 shrink-0 items-center justify-center rounded-full border"
                        aria-hidden="true"
                    >
                        <CircleAlertIcon className="opacity-80" size={16} />
                    </div>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently
                            delete {count} selected{" "}
                            {count === 1 ? "row" : "rows"}.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                </div>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDeleteRows}>
                        Delete
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
