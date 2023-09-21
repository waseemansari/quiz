import Header from '../__Layout/Header';
import React from 'react';
export default function Home() {
      
    return (
        <div className="Home">
            
            <Header />
            
            <main id="main" className="main">
                <section className="section">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="card">
                                <div className="card-body">
                                   welcome to TEST                         

                                </div>
                            </div>
                        </div>
                    </div>
                </section> 
            </main>
           
        </div>
    );
}