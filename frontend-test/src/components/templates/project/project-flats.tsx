"use client";

// interface ProjectFlatsProps {
//     slug: string;
//     estates?: EstateObject[];
//     projectId?: number;
// }

// export function ProjectFlats({ slug, estates, projectId }: ProjectFlatsProps) {
//     const searchParams = useSearchParams();

//     const parsedParams = queryString.parse(
//         searchParams.toString(),
//     ) as FilterValues;

//     const { flats, isLoading, flatsCount, nextPage, prevPage } = useFlats({
//         ...parsedParams,
//         slug,
//         pageSize: "9",
//     });

//     const [showFilters, setShowFilters] = useState(false);

//     const desktop = useMediaQuery("(min-width: 768px)");

//     useEffect(() => {
//         if (desktop) {
//             setShowFilters(true);
//         }
//         // eslint-disable-next-line react-hooks/exhaustive-deps -- only for first render
//     }, []);

//     const minSquare = findMinFilterOption(estates, "square_min");
//     const maxSquare = findMaxFilterOption(estates, "square_max");

//     const minRooms = findMaxFilterOption(estates, "rooms_min");
//     const maxRooms = findMaxFilterOption(estates, "rooms_max");

//     const minFloor = findMinFilterOption(estates, "floor_min");
//     const maxFloor = findMaxFilterOption(estates, "floor_max");

//     const minPrice = findMinFilterOption(estates, "price_min");
//     const maxPrice = findMaxFilterOption(estates, "price_max");

//     const scrollToRef = useRef<HTMLDivElement | null>(null);
//     const onPaginationChange = useCallback(() => {
//         if (scrollToRef.current) {
//             scrollToRef.current.scrollIntoView({
//                 behavior: "smooth",
//                 block: "nearest",
//             });
//         }
//     }, []);

//     return (
//         <div className="container mb-6">
//             <h2 className="font-mono text-4xl xl:text-5xl">Каталог квартир</h2>

//             <div className="flex flex-col gap-y-4 xl:gap-y-16">
//                 <Button
//                     onClick={() => {
//                         setShowFilters((prev) => !prev);
//                     }}
//                     variant="outline"
//                     className="mt-4 flex md:hidden lg:mt-10 [&>svg]:hover:stroke-white"
//                 >
//                     Фильтры{" "}
//                     <FilterIcon className="ml-2 fill-black stroke-black" />
//                 </Button>

//                 <div ref={scrollToRef} className={"md:pt-6 xl:pt-16"}>
//                     {showFilters ? (
//                         <FlatsFilter
//                             filtersOptions={{
//                                 housing:
//                                     estates?.map((el) => ({
//                                         id: el.corps || 0,
//                                         title: el.title || "",
//                                     })) || [],

//                                 fromSquare: minSquare,
//                                 toSquare: maxSquare,
//                                 fromRooms: minRooms,
//                                 toRooms: maxRooms,
//                                 fromFloor: minFloor,
//                                 toFloor: maxFloor,
//                                 fromPrice: minPrice,
//                                 toPrice: maxPrice,
//                             }}
//                         />
//                     ) : undefined}
//                 </div>

//                 <FlatList
//                     flats={flats}
//                     isLoading={isLoading}
//                     projectId={projectId}
//                 />

//                 <ProjectsPagination
//                     onPaginationChange={onPaginationChange}
//                     count={flatsCount}
//                     pageSize={9}
//                     next={nextPage}
//                     prev={prevPage}
//                 />
//             </div>
//         </div>
//     );
// }

// interface FlatListProps {
//     flats?: FlatType[];
//     isLoading: boolean;
//     projectId?: number;
// }

// function FlatList({ flats, isLoading, projectId }: FlatListProps) {
//     const router = useRouter();
//     const pathname = usePathname();
//     const searchParams = useSearchParams();

//     const { flat: parsedFlat, page: parsedPage = 1 } = queryString.parse(
//         searchParams.toString(),
//     ) as unknown as DialogState;

//     const onFlatSelect = (id: string, view: "detail" | "form") => {
//         router.push(
//             pathname +
//                 "?" +
//                 queryString.stringify({
//                     flat: id,
//                     view: view,
//                     page: parsedPage,
//                 }),
//             {
//                 scroll: false,
//             },
//         );
//     };

//     const onCloseFlatInfoDialog = () => {
//         router.push(
//             pathname +
//                 "?" +
//                 queryString.stringify({
//                     page: parsedPage,
//                 }),
//             {
//                 scroll: false,
//             },
//         );
//     };

//     if (isLoading) {
//         return (
//             <div className="grid grid-flow-row gap-x-8 gap-y-6 max-xl:mb-4 sm:grid-cols-2 md:grid-cols-3 xl:gap-y-14">
//                 {Array.from({ length: 9 }).map((_, i) => (
//                     <div key={i} className="flex flex-col">
//                         <div className="mb-6 rounded bg-gray-bg">
//                             <div className="h-[357px] w-[334px] animate-pulse" />
//                         </div>

//                         <div className="mb-3 h-[28px] w-56 animate-pulse rounded bg-gray-light" />
//                         <div className="mb-6 h-[32px] w-32 animate-pulse rounded bg-gray-light" />

//                         <div className="flex h-[46px] justify-center gap-x-4">
//                             <div className="size-full animate-pulse rounded-lg bg-gray-light" />
//                             <div className="size-full animate-pulse rounded-lg bg-gray-light" />
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         );
//     }

//     if (!projectId || flats?.length === 0 || !flats) {
//         return (
//             <div className="flex size-full flex-col items-center justify-center gap-y-5 max-xl:mb-4">
//                 <div className="text-center font-semibold text-primary lg:text-left lg:text-2xl">
//                     По заданным фильтрам квартир не найдено {":("}
//                 </div>
//             </div>
//         );
//     }

//     return (
//         <div className="grid grid-flow-row gap-x-8 gap-y-6 max-xl:mb-4 sm:grid-cols-2 md:grid-cols-3 xl:gap-y-14">
//             {flats.map((flat) => (
//                 <div key={flat.id} className="flex flex-col">
//                     <div className="mb-6 flex h-96 w-full items-center justify-center overflow-hidden rounded bg-gray-bg px-7 py-4">
//                         <Image
//                             src={flat.layout.image}
//                             width={334}
//                             height={357}
//                             alt={flat.layout.title}
//                             priority
//                             className="object-contain"
//                         />
//                     </div>

//                     <div className="mb-1 text-xl lg:mb-3">
//                         Площадь {flat.layout.square}
//                     </div>
//                     <div className="mb-3 text-2xl font-bold lg:mb-6">
//                         {new Intl.NumberFormat("ru-RU").format(
//                             Number(flat.price),
//                         )}{" "}
//                         ₽
//                     </div>

//                     <div className="flex justify-center gap-x-4">
//                         <Button
//                             variant="outline"
//                             className="w-full"
//                             onClick={() => {
//                                 onFlatSelect(String(flat.id), "detail");
//                             }}
//                         >
//                             Подробнее
//                         </Button>
//                         <Button
//                             className="w-full"
//                             onClick={() => {
//                                 onFlatSelect(String(flat.id), "form");
//                             }}
//                         >
//                             Бронь
//                         </Button>
//                     </div>
//                 </div>
//             ))}

//             <FlatInfoDialog
//                 key="flat-info"
//                 open={!!parsedFlat}
//                 onClose={onCloseFlatInfoDialog}
//                 flatInfo={flats.find((f) => String(f.id) === parsedFlat)}
//                 projectId={projectId}
//             />
//         </div>
//     );
// }
