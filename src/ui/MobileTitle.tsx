interface MobileTitle {
  main: string;
  second: string;
}

export const MobileTitle = ({ main, second }: MobileTitle) => {
  return (
    <div className="col-span-1 md:hidden">
      <h2 className="text-3xl font-extrabold leading-tight text-center">
        {main} <span className="text-blue-500 italic">{second}</span>
      </h2>
    </div>
  );
};
