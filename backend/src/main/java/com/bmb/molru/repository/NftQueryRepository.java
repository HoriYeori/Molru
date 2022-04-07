package com.bmb.molru.repository;

import com.bmb.molru.domain.Category;
import com.bmb.molru.domain.Nft;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;
import org.springframework.stereotype.Repository;

import java.util.List;

import static com.bmb.molru.domain.QNft.nft;

@Repository
public class NftQueryRepository extends QuerydslRepositorySupport {
    private JPAQueryFactory jpaQueryFactory;

    public NftQueryRepository(JPAQueryFactory jpaQueryFactory) {
        super(Nft.class);
        this.jpaQueryFactory = jpaQueryFactory;
    }

    public List<Nft> findFilteredNft(String category, String status, String address) {
        return jpaQueryFactory.selectFrom(nft)
                .where(
                        eqCategory(category),
                        eqStatus(status),
                        eqAddress(address))
                .fetch();
    }

    private BooleanExpression eqCategory(String category) {
        if(Category.convert(category) == null) {
            return null;
        }
        return nft.category.eq(Category.convert(category));
    }

    private BooleanExpression eqStatus(String status) {
        if("all".equals(status.toLowerCase())) {
            return null;
        }

        boolean isSale = ("sale".equals(status.toLowerCase())) ? true : false;

        return nft.onSale.eq(isSale);
    }

    private BooleanExpression eqAddress(String address) {
        if("".equals(address.trim()) || "null".equals(address)) {
            return null;
        }

        return nft.owner.address.eq(address);
    }
}
