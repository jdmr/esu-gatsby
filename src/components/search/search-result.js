import { Link } from 'gatsby'
import { default as React } from 'react'
import PropTypes from 'prop-types'
import {
    connectStateResults,
    Highlight,
    Hits,
    Index,
    Snippet,
    PoweredBy
} from 'react-instantsearch-dom'

const HitCount = connectStateResults(({ searchResults }) => {
    const hitCount = searchResults && searchResults.nbHits

    return hitCount > 0 ? (
        <span className="text-primary">
            {hitCount} artículo{hitCount !== 1 ? `s` : ``}
        </span>
    ) : null
})

const PageHit = ({ hit }) => (
    <div>
        <Link to={hit.slug}>
            <h4>
                <Highlight attribute="title" hit={hit} tagName="mark" />
            </h4>
        </Link>
        <div className="text-gray-400 leading-relaxed">
            <Snippet attribute="excerpt" hit={hit} tagName="mark" />
        </div>
    </div>
)

PageHit.propTypes = {
    hit: PropTypes.object
}

const HitsInIndex = ({ index }) => (
    <Index indexName={index.name}>
        {index.name !== 'esu_perfiles' && (
            <div className="HitCount">
                <HitCount />
                <span className="pl-2 text-primary">en {index.title}</span>
            </div>
        )}
        <Hits className="Hits" hitComponent={PageHit} />
    </Index>
)

HitsInIndex.propTypes = {
    index: PropTypes.object
}

const SearchResult = ({ indices, className }) => (
    <div className={className}>
        {indices.map((index) => (
            <HitsInIndex index={index} key={index.name} />
        ))}
        <PoweredBy />
    </div>
)

SearchResult.propTypes = {
    indices: PropTypes.array,
    className: PropTypes.string
}

export default SearchResult
