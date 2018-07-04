<?php

namespace EmpresaBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * Vehiculo
 *
 * @ORM\Table(name="vehiculo")
 * @ORM\Entity(repositoryClass="EmpresaBundle\Repository\VehiculoRepository")
 */
class Vehiculo
{
    /**
     * @var int
     *
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id;

    /**
     * @var string
     *
     * @ORM\Column(name="patente", type="string", length=255)
     */
    private $patente;

    /**
     * @var string
     *
     * @ORM\Column(name="marca", type="string", length=255)
     */
    private $marca;

    /**
     * @var string
     *
     * @ORM\Column(name="modelo", type="string", length=255)
     */
    private $modelo;

    /**
     * @var string
     *
     * @ORM\Column(name="pathimagen", type="string", length=255)
     * @Assert\File(mimeTypes={"image/jpeg"})
     */
    private $pathimagen;

    /**
     * @var bool
     *
     * @ORM\Column(name="disponible", type="boolean")
     */
    private $disponible;


    /**
     * Get id
     *
     * @return int
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set patente
     *
     * @param string $patente
     *
     * @return Vehiculo
     */
    public function setPatente($patente)
    {
        $this->patente = $patente;

        return $this;
    }

    /**
     * Get patente
     *
     * @return string
     */
    public function getPatente()
    {
        return $this->patente;
    }

    /**
     * Set marca
     *
     * @param string $marca
     *
     * @return Vehiculo
     */
    public function setMarca($marca)
    {
        $this->marca = $marca;

        return $this;
    }

    /**
     * Get marca
     *
     * @return string
     */
    public function getMarca()
    {
        return $this->marca;
    }

    /**
     * Set modelo
     *
     * @param string $modelo
     *
     * @return Vehiculo
     */
    public function setModelo($modelo)
    {
        $this->modelo = $modelo;

        return $this;
    }

    /**
     * Get modelo
     *
     * @return string
     */
    public function getModelo()
    {
        return $this->modelo;
    }

    /**
     * Set pathimagen
     *
     * @param string $pathimagen
     *
     * @return Vehiculo
     */
    public function setPathimagen($pathimagen)
    {
        $this->pathimagen = $pathimagen;

        return $this;
    }

    /**
     * Get pathimagen
     *
     * @return string
     */
    public function getPathimagen()
    {
        return $this->pathimagen;
    }

    /**
     * Set disponible
     *
     * @param boolean $disponible
     *
     * @return Vehiculo
     */
    public function setDisponible($disponible)
    {
        $this->disponible = $disponible;

        return $this;
    }

    /**
     * Get disponible
     *
     * @return bool
     */
    public function getDisponible()
    {
        return $this->disponible;
    }
}

