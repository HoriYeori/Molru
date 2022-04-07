package com.bmb.molru.service;

import com.bmb.molru.domain.Nft;
import com.bmb.molru.domain.User;
import com.bmb.molru.dto.GachaDto;
import com.bmb.molru.dto.NftDto;
import com.bmb.molru.repository.NftQueryRepository;
import com.bmb.molru.repository.NftRepository;
import com.bmb.molru.repository.UserRepository;
import com.bmb.molru.util.CommonService;
import com.bmb.molru.util.MediaService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import javax.xml.bind.DatatypeConverter;
import java.security.MessageDigest;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Random;

@Service
@RequiredArgsConstructor
public class NftService {

    /*** Service ***/
    private final CommonService commonService;
    private final MediaService mediaService;
    /*** Repository ***/
    private final NftRepository nftRepository;
    private final UserRepository userRepository;
    private final NftQueryRepository nftQueryRepository;


    public ResponseEntity<?> createNft(NftDto nftDto) {
        try {
            User userByAddress = userRepository.findByAddress(nftDto.getOwnerAddress()).orElse(null);
            if (userByAddress == null) {
                System.out.println("no user");
                User admin = userRepository.findById(0L).orElse(null);
                if (admin == null)
                    return new ResponseEntity<Void>(HttpStatus.BAD_REQUEST);
                else
                    userByAddress = admin;
            }

            // check image duplication
            MessageDigest md = MessageDigest.getInstance("MD5");
            md.update(nftDto.getImage().getBytes());
            byte[] digest = md.digest();
            String hashCode = DatatypeConverter.printHexBinary(digest).toUpperCase();

            if (nftRepository.countByTokenHash(hashCode) > 0)
                return new ResponseEntity<Void>(HttpStatus.CONFLICT);

            // save media files
            String imagePath = mediaService.save(nftDto.getImage());
            String audioPath = mediaService.save(nftDto.getAudio());

            Nft nft = Nft.builder()
                    .tokenCA(nftDto.getTokenCA())
                    .tokenHash(hashCode)
                    .tokenTitle(nftDto.getTokenTitle())
                    .tokenDescription(nftDto.getTokenDescription())
                    .owner(userByAddress)
                    .category(nftDto.getCategory())
                    .onSale(false)
                    .imagePath(imagePath)
                    .audioPath(audioPath)
                    .build();

            Nft savedNft = nftRepository.save(nft);
            NftDto savedNftDto = NftDto.convert(savedNft);

            return new ResponseEntity<>(savedNftDto, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<Void>(HttpStatus.BAD_REQUEST);
        }
    }

    public ResponseEntity<?> getRecentNft() {
        Nft nft = nftRepository.findTop1ByOrderByCreatedDateDesc().orElse(null);
        if (nft == null)
            return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
        else
            return new ResponseEntity<>(NftDto.convert(nft), HttpStatus.OK);
    }

    public ResponseEntity<?> updateTokenId(Long nftId, Long tokenId) {
        Nft nft = nftRepository.findById(nftId).orElse(null);
        if (nft == null)
            return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);

        nft.setTokenId(tokenId);
        nftRepository.save(nft);

        return new ResponseEntity<>("success", HttpStatus.OK);
    }

    public ResponseEntity<NftDto> updateNft(NftDto nftDto) {
        try {
            Nft findNft = nftRepository.findByTokenId(nftDto.getTokenId()).orElse(null);

            if(findNft == null) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }

            User userByAddress = userRepository.findByAddress(nftDto.getOwnerAddress()).orElse(null);

            if(userByAddress == null) {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }

            findNft.setOwner(userByAddress);
            findNft.setTokenTitle(nftDto.getTokenTitle());
            findNft.setTokenDescription(nftDto.getTokenDescription());
            findNft.setOnSale(nftDto.isOnSale());

            Nft savedNft = nftRepository.save(findNft);
            NftDto updatedNft = NftDto.convert(savedNft);

            return new ResponseEntity<>(updatedNft, HttpStatus.OK);
        } catch(Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    public ResponseEntity<NftDto> findNft(Long tokenId) {
        try {
            Nft nft = nftRepository.findByTokenId(tokenId).orElse(null);
            if(nft == null) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }

            NftDto nftDto = NftDto.convert(nft);

            return new ResponseEntity<>(nftDto, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    public ResponseEntity<List<NftDto>> searchNft(String category, String status, String address) {
        try {
            List<Nft> filteredNft = nftQueryRepository.findFilteredNft(category, status, address);
            List<NftDto> nftDtoList = new ArrayList<>();

            for (Nft nft : filteredNft) {
                nftDtoList.add(NftDto.convert(nft));
            }

            return new ResponseEntity<>(nftDtoList, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    public ResponseEntity<List<NftDto>> searchBarNft(String condition) {
        try {
            List<Nft> filteredNft = nftQueryRepository.searchByCondition(condition);
            List<NftDto> nftDtoList = new ArrayList<>();

            for (Nft nft : filteredNft) {
                nftDtoList.add(NftDto.convert(nft));
            }

            return new ResponseEntity<>(nftDtoList, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    public ResponseEntity<List<NftDto>> findAllNftByUser(String address) {
        try {
            User user = userRepository.findByAddress(address).orElse(null);
            if(user == null) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }

            List<Nft> nftList = nftRepository.findAllByOwner(user);
            List<NftDto> nftDtoList = new ArrayList<>();

            for (Nft nft : nftList) {
                nftDtoList.add(NftDto.convert(nft));
            }

            return new ResponseEntity<>(nftDtoList, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    public ResponseEntity<NftDto> randomGacha(GachaDto gachaDto) {
        try {
            User admin = userRepository.findByAddress(gachaDto.getAdminAddress()).orElse(null);
            User user = userRepository.findByAddress(gachaDto.getUserAddress()).orElse(null);
            if(admin == null || user == null) {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }

            List<Nft> nftList = nftRepository.findAllByOwner(admin);

            if(nftList.size() == 0) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }

            Random random = new Random();
            int randomNum = random.nextInt(nftList.size());

            Nft gachaNft = nftList.get(randomNum);
            gachaNft.setOwner(user);

            Nft newNft = nftRepository.save(gachaNft);
            NftDto nftDto = NftDto.convert(newNft);

            return new ResponseEntity<>(nftDto, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
}
