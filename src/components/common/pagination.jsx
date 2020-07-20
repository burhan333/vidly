import React, {Component} from 'react';
import PropType from 'prop-types'
import _ from 'lodash';

class Pagination extends Component
{
    render()
    {
        const { itemsCount, pageSize, currentPage, onPageChange } = this.props
        const pagesCount =  Math.ceil(itemsCount / pageSize);
        const pages = _.range(1, pagesCount + 1);

        if (pagesCount === 1) return null;
        
        return(
            <nav>
                <ul className="pagination">
                    {pages.map(page => 
                        <li key={page} className={page === currentPage ? 'page-item active' : 'page-item'}>
                        <a className="page-link" onClick={()=> onPageChange(page)}> {page}</a>
                        </li>
                    )}
                </ul>
            </nav>
        );
    }
}

export default Pagination;


Pagination.propTypes = {
    itemsCount: PropType.number.isRequired,
    pageSize: PropType.number.isRequired,
    currentPage: PropType.number.isRequired,
    onPageChange: PropType.func.isRequired
}