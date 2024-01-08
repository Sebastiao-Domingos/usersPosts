import React, { HTMLAttributes, ReactElement } from "react";

interface SubHeaderProps extends HTMLAttributes<HTMLDivElement>{
    icon : string;
    title : string;
    ammount? : number
};
function SubHeader( {icon , title,ammount=0 , children } : SubHeaderProps) {
    return (  
        <div className=" w-full flex justify-between items-center py-6">
                        
            <h2 className="text-2xl text-orange-500 space-x-2 pl-2 border-l">
                <i className={`${icon} text-slate-300`}></i> 
                <span>{title}</span>
                <span className="text-slate-300 text-sm">{ammount}</span>
            </h2>
            {children}
            {/* <button className="space-x-2 px-4 py-3 rounded shadow">
                <i className="ri-user-add-line text-slate-300"></i>
                <span className="text-orange-500">Create</span>
            </button> */}
        </div>
    );
}

export default SubHeader;