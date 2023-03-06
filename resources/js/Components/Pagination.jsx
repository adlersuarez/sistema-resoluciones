import React from 'react';
import { Link } from '@inertiajs/inertia-react';
  
export default function Pagination({ links }) {
    
    function getClassName(active) {
        if(active) {
            return "mr-1 mb-1 px-4 py-3 text-sm leading-4 border rounded hover:bg-[#007CBC] focus:border-primary focus:text-primary bg-[#0064bc] text-white";
        } else{
            return "mr-1 mb-1 px-4 py-3 text-sm leading-4 border rounded hover:bg-[#9dcffa] focus:border-primary focus:text-primary";
        }
    }
    return (
        links.length > 3 && (
            <div className="mb-2">
                
                <div className="flex flex-wrap mt-8">
                    {links.map((link, key) => (
                            link.url === null ?
                                    (<div
                                            key={link.label}
                                            dangerouslySetInnerHTML={{__html: link.label}}
                                            className="mr-1 mb-1 px-4 py-3 text-sm leading-4 text-gray-500 border rounded"
                                        ></div>) :
  
                                    (<Link
                                                key={link.label}
                                                className={getClassName(link.active)}
                                                href={ link.url }
                                                dangerouslySetInnerHTML={{__html: link.label}}
                                            ></Link>)
                                    ))}
                </div>
            </div>
        )
    );
}