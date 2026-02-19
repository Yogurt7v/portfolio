interface MobileButton {
  title: string;
}

export const MobileButton = ({ title }: MobileButton) => {
  return (
    <div className="flex md:hidden mt-10 justify-center">
      <a
        href="#contact"
        className="px-10 py-4 bg-blue-600 text-white rounded-full font-bold text-lg active:scale-95 shadow-xl"
      >
        {title}
      </a>
    </div>
  );
};
